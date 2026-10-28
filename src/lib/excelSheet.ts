import "server-only";
import { google } from "googleapis";
import { validateCallerId } from "@/lib/callerAttribution";

const HEADERS = [
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
const MANUAL = new Set([
  "corrections",
  "status 1",
  "status 2",
  "status 3 (nashra)",
  "status 4",
  "status 5",
]);
const normalize = (x: unknown) =>
  String(x ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
const column = (index: number) => {
  let s = "";
  while (index > 0) {
    index--;
    s = String.fromCharCode(65 + (index % 26)) + s;
    index = Math.floor(index / 26);
  }
  return s;
};
const tabName = (s: string) => `'${s.replace(/'/g, "''")}'`;
function credentials() {
  if (!process.env.GOOGLE_CREDENTIALS_BASE64)
    throw new Error("GOOGLE_CREDENTIALS_BASE64 missing");
  return JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString(
      "utf8",
    ),
  );
}
export async function appendToExcel(
  spreadsheetId: string,
  sheetName: string,
  rowData: Record<string, string>,
): Promise<void> {
  const auth = new google.auth.GoogleAuth({
    credentials: credentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const tab = tabName(sheetName);
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A1:AZ1`,
  });
  const headers = (response.data.values?.[0] ?? []).map((h) => String(h ?? ""));
  while (headers.length && !headers[headers.length - 1].trim()) headers.pop();
  if (!headers.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
    headers.push(...HEADERS);
  }
  let callerIndices = headers
    .map((h, i) => (normalize(h) === "caller id" ? i : -1))
    .filter((i) => i >= 0);
  if (!callerIndices.length) {
    if (headers.length >= 52) throw new Error("No free column for Caller ID");
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!${column(headers.length + 1)}1`,
      valueInputOption: "RAW",
      requestBody: { values: [["Caller ID"]] },
    });
    headers.push("Caller ID");
    callerIndices = [headers.length - 1];
  }
  if (callerIndices.length !== 1)
    throw new Error("Duplicate Caller ID headers. Manual repair required.");
  const tracking = validateCallerId(rowData["Caller ID"]) ?? "Unassigned";
  const map = new Map(
    Object.entries(rowData).map(([key, value]) => [normalize(key), value]),
  );
  const row = headers.map((header) => {
    const key = normalize(header);
    if (key === "caller id") return tracking;
    if (key === "date & time")
      return map.get("date & time") ?? map.get("date") ?? "";
    if (MANUAL.has(key)) return "";
    return map.get(key) ?? "";
  });
  if (row[callerIndices[0]] !== tracking)
    throw new Error("Caller ID row mismatch");
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:${column(headers.length)}`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
  console.info("Google Sheets row appended:", {
    sheetName,
    callerId: tracking,
    callerColumn: column(callerIndices[0] + 1),
  });
}
