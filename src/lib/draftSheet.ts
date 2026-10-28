import "server-only";
import { google } from "googleapis";

const SHEET = "Incomplete Leads";
const HEADERS = ["Draft ID", "Updated At", "Form Type", "Name", "Email", "Phone", "Caller ID", "Status"];
export type DraftRow = {
  draftId: string; updatedAt: string; formType: string; name: string;
  email: string; phone: string; callerId: string; status: string;
};

/** Updates a matching draft row; does not append another row on normal edits.
 *  External Sheet API is not transactional: concurrent first saves can still race.
 */
export async function upsertDraftSheet(row: DraftRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (!spreadsheetId || !base64) throw new Error("Sheets env missing");
  const credentials = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const header = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${SHEET}'!A1:H1` });
  const actual = (header.data.values?.[0] ?? []).map(String);
  if (!actual.length) {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${SHEET}'!A1`, valueInputOption: "RAW", requestBody: { values: [HEADERS] } });
  } else if (HEADERS.some((value, i) => actual[i] !== value)) {
    throw new Error("Incomplete Leads sheet header mismatch; refusing unsafe write");
  }
  const values = [row.draftId, row.updatedAt, row.formType, row.name, row.email, row.phone, row.callerId, row.status];
  const ids = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${SHEET}'!A2:A` });
  const index = (ids.data.values ?? []).findIndex((r) => r[0] === row.draftId);
  if (index >= 0) {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${SHEET}'!A${index + 2}:H${index + 2}`, valueInputOption: "RAW", requestBody: { values: [values] } });
  } else {
    await sheets.spreadsheets.values.append({ spreadsheetId, range: `'${SHEET}'!A:H`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: [values] } });
  }
}
