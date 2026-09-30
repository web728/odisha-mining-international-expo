function esc(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildAdminEmailHtml({
  badge,
  submittedAt,
  rows,
}: {
  badge: string;
  submittedAt: string;
  rows: Array<{
    label: string;
    value?: unknown;
  }>;
}) {
  const table = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="
            padding:12px 0;
            border-bottom:1px solid #e4e4e7;
            width:34%;
            vertical-align:top;
            font-weight:700;
          ">
            ${esc(label)}
          </td>

          <td style="
            padding:12px 0;
            border-bottom:1px solid #e4e4e7;
            vertical-align:top;
            line-height:1.6;
          ">
            ${esc(value || "-")}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <body style="
        margin:0;
        background:#f4f4f5;
        font-family:Arial,sans-serif;
        color:#18181b;
      ">
        <div style="
          max-width:680px;
          margin:0 auto;
          padding:28px 16px;
        ">
          <div style="
            background:#050505;
            color:#fff;
            padding:24px;
            border-top:4px solid #f9b900;
          ">
            <div style="
              color:#f9b900;
              font-size:11px;
              font-weight:700;
              letter-spacing:.14em;
              text-transform:uppercase;
            ">
              ${esc(badge)}
            </div>

            <h1 style="
              font-size:24px;
              margin:8px 0 0;
              line-height:1.15;
            ">
              Odisha Mining Expo 2027
            </h1>
          </div>

          <div style="
            background:#fff;
            padding:24px;
          ">
            <p style="
              margin-top:0;
              color:#71717a;
              font-size:13px;
            ">
              Submitted: ${esc(submittedAt)}
            </p>

            <table style="
              width:100%;
              border-collapse:collapse;
              font-size:14px;
            ">
              ${table}
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
}