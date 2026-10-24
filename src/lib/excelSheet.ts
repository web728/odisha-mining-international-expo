
import "server-only";
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
const MAX_COLUMNS = 52; // A through AZ

function normalizeHeader(value: unknown): string {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[\u200b-\u200d\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function isCallerHeader(value: unknown): boolean {
  return normalizeHeader(value) === "caller id";
}

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

function quotedSheetName(name: string): string {
  return `'${name.replace(/'/g, "''")}'`;
}

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

type SheetsClient = Awaited<
  ReturnType<typeof getSheetsClient>
>;

async function ensureHeaderRow(
  sheets: SheetsClient,
  spreadsheetId: string,
  sheetName: string
): Promise<string[]> {
  const tab = quotedSheetName(sheetName);

  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tab}!A1:AZ1`,
    });

  const headers = (
    response.data.values?.[0] ?? []
  ).map((value) => String(value ?? ""));

  // Remove only trailing empty header cells.
  // Keep positions of all existing columns intact.
  while (
    headers.length > 0 &&
    !headers[headers.length - 1].trim()
  ) {
    headers.pop();
  }

  // Completely empty sheet.
  if (headers.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [MASTER_HEADERS],
      },
    });

    return [...MASTER_HEADERS];
  }

  // Match even when spaces/case differ.
  const callerIndex = headers.findIndex(
    isCallerHeader
  );

  if (callerIndex >= 0) {
    return headers;
  }

  if (headers.length >= MAX_COLUMNS) {
    throw new Error(
      "Caller ID header missing and no free column available."
    );
  }

  // Append Caller ID AFTER existing headers.
  // Never overwrite status or other columns.
  const nextColumn = toColumnLetter(
    headers.length + 1
  );

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${tab}!${nextColumn}1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[CALLER_HEADER]],
    },
  });

  console.info(
    "Google Sheets Caller ID header added:",
    {
      sheetName,
      column: nextColumn,
    }
  );

  return [...headers, CALLER_HEADER];
}

function getRowValue(
  rowData: Record<string, string>,
  header: string
): string {
  const normalized = normalizeHeader(header);

  if (normalized === "date & time") {
    return (
      rowData["Date & Time"] ??
      rowData.Date ??
      ""
    );
  }

  // Keep manual status columns empty for new leads.
  const manualHeaders = new Set([
    "corrections",
    "status 1",
    "status 2",
    "status 3 (nashra)",
    "status 4",
    "status 5",
  ]);

  if (manualHeaders.has(normalized)) {
    return "";
  }

  if (isCallerHeader(header)) {
    const caller = String(
      rowData[CALLER_HEADER] ?? ""
    ).trim();

    if (
      caller === "caller_1" ||
      caller === "caller_2"
    ) {
      return caller;
    }

    return "Unassigned";
  }

  // Prefer exact header match.
  if (Object.prototype.hasOwnProperty.call(
    rowData,
    header
  )) {
    return rowData[header] ?? "";
  }

  // Support harmless header spacing/case differences.
  const matchedKey = Object.keys(rowData).find(
    (key) =>
      normalizeHeader(key) === normalized
  );

  return matchedKey
    ? rowData[matchedKey] ?? ""
    : "";
}

export async function appendToExcel(
  spreadsheetId: string,
  sheetName: string,
  rowData: Record<string, string>
): Promise<void> {
  const sheets = await getSheetsClient();

  const headers = await ensureHeaderRow(
    sheets,
    spreadsheetId,
    sheetName
  );

  const callerColumns = headers
    .map((header, index) =>
      isCallerHeader(header) ? index : -1
    )
    .filter((index) => index >= 0);

  if (callerColumns.length !== 1) {
    throw new Error(
      `Expected one Caller ID column, found ${callerColumns.length}`
    );
  }

  const row = headers.map((header) =>
    getRowValue(rowData, header)
  );

  const callerIndex = callerColumns[0];

  // Prevent silent Caller ID mapping mismatch.
  const expectedCaller =
    rowData[CALLER_HEADER] === "caller_1" ||
    rowData[CALLER_HEADER] === "caller_2"
      ? rowData[CALLER_HEADER]
      : "Unassigned";

  if (row[callerIndex] !== expectedCaller) {
    throw new Error(
      "Google Sheets Caller ID mapping mismatch"
    );
  }

  const tab = quotedSheetName(sheetName);
  const endColumn = toColumnLetter(
    headers.length
  );

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:${endColumn}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });

  // Log metadata only, never personal data.
  console.info("Google Sheets row appended:", {
    sheetName,
    callerId: expectedCaller,
    callerColumn: toColumnLetter(
      callerIndex + 1
    ),
  });
}
