import { google } from "googleapis";

const MASTER_HEADERS = [
  "Date",
  "Platform",
  "Register As",
  "Company Name",
  "Contact Person",
  "Designation",
  "Email Id",
  "Mobile No.",
  "Website",
  "Address",
  "Country",
  "Area of Interest",
  "Info. Get From",
  "Message",
  "Product Profile",
  "Corrections",
  "STATUS 1",
  "STATUS 2",
  "STATUS 3 (Nashra)",
  "Status 4",
  "STATUS 5",
];

function getCredentials() {
  const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;

  if (!base64) {
    throw new Error(
      "GOOGLE_CREDENTIALS_BASE64 environment variable is missing."
    );
  }

  return JSON.parse(
    Buffer.from(base64, "base64").toString("utf-8")
  );
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

async function ensureHeaderRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string
) {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:AZ1`,
    });

  const existing =
    response.data.values?.[0];

  if (existing?.length) {
    while (
      existing.length &&
      !String(
        existing[existing.length - 1] ?? ""
      ).trim()
    ) {
      existing.pop();
    }

    return existing.map((header) =>
      String(header ?? "").trim()
    );
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [MASTER_HEADERS],
    },
  });

  return MASTER_HEADERS;
}

export async function appendToExcel(
  spreadsheetId: string,
  sheetName: string,
  rowData: Record<string, string>
) {
  const sheets = await getSheetsClient();

  const headers = await ensureHeaderRow(
    sheets,
    spreadsheetId,
    sheetName
  );

  const row = headers.map((header) => {
    const key = header.trim();

    if (
      key === "Corrections" ||
      key === "STATUS 1" ||
      key === "STATUS 2" ||
      key === "STATUS 3 (Nashra)" ||
      key === "Status 4" ||
      key === "STATUS 5"
    ) {
      return "";
    }

    return rowData[key] ?? "";
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:AZ`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}