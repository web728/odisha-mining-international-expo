import "server-only";
import { google } from "googleapis";
const TAB = "Incomplete Leads";
const HEADERS = ["Draft ID", "Last Updated (UTC)", "Form", "Name", "Email", "Phone", "Source", "Status"];
export type IncompleteLeadSheetRow = {
  draftId: string; formKind: string; name: string; email: string; phone: string;
  callerId: string; updatedAt: string;
};
const q = (value: string) => `'${value.replace(/'/g, "''")}'`;
export async function upsertIncompleteLeadSheet(spreadsheetId: string, lead: IncompleteLeadSheetRow) {
  const encoded = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (!encoded) throw new Error("GOOGLE_CREDENTIALS_BASE64 missing");
  const credentials = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  // This tab needs to exist. We deliberately never touch Website Enquries.
  const tab = q(TAB);
  const read = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${tab}!A1:H` });
  const values = read.data.values ?? [];
  const existingHeaders = (values[0] ?? []).map(String);
  if (!existingHeaders.length) {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `${tab}!A1:H1`, valueInputOption: "RAW", requestBody: { values: [HEADERS] } });
  } else if (HEADERS.some((header, i) => existingHeaders[i] !== header)) {
    throw new Error("Incomplete Leads sheet headers mismatch");
  }
  const row = [lead.draftId, lead.updatedAt, lead.formKind, lead.name, lead.email, lead.phone, lead.callerId, "Incomplete - opted in"];
  const found = values.findIndex((r, index) => index > 0 && r[0] === lead.draftId);
  if (found >= 0) {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `${tab}!A${found + 1}:H${found + 1}`, valueInputOption: "RAW", requestBody: { values: [row] } });
  } else {
    await sheets.spreadsheets.values.append({ spreadsheetId, range: `${tab}!A:H`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: [row] } });
  }
}
