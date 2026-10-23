
import { google } from "googleapis";

const MASTER_HEADERS = [
  "Date & Time",
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
  "Caller ID",
];

const CALLER_HEADER = "Caller ID";

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
): Promise<string[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!A1:AZ1`,
  });

  const existing = (response.data.values?.[0] ?? []).map(
    (header) => String(header ?? "").trim()
  );

  while (
    existing.length &&
    !existing[existing.length - 1]
  ) {
    existing.pop();
  }

  // New or empty sheet: create existing master headers.
  if (!existing.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName.replace(/'/g, "''")}'!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [MASTER_HEADERS],
      },
    });

    return [...MASTER_HEADERS];
  }

  // Preserve all existing headers and their column order.
  if (existing.includes(CALLER_HEADER)) {
    return existing;
  }

  // Add Caller ID only after the existing final column.
  if (existing.length >= 52) {
    throw new Error(
      "Unable to add Caller ID: sheet has reached the configured AZ column limit."
    );
  }

  const columnIndex = existing.length + 1;

  function toColumnLetter(index: number): string {
    let value = index;
    let result = "";

    while (value > 0) {
      value--;
      result =
        String.fromCharCode(65 + (value % 26)) +
        result;
      value = Math.floor(value / 26);
    }

    return result;
  }

  const column = toColumnLetter(columnIndex);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!${column}1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[CALLER_HEADER]],
    },
  });

  return [...existing, CALLER_HEADER];
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

    if (key === "Date & Time") {
      return (
        rowData["Date & Time"] ||
        rowData["Date"] ||
        ""
      );
    }

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

    if (key === CALLER_HEADER) {
      return rowData[CALLER_HEADER] || "Unassigned";
    }

    return rowData[key] ?? "";
  });

  const safeSheetName = sheetName.replace(/'/g, "''");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${safeSheetName}'!A:AZ`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}
