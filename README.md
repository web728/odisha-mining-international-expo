# Odisha Mining & Infrastructure International Expo 2027

Production-oriented Next.js + TypeScript + Tailwind CSS rebuild for the Odisha Mining Expo website.

## Stack

- Next.js App Router
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- MongoDB Atlas
- Google Sheets API
- Gmail SMTP via Nodemailer

## Assets

All supplied website assets are referenced from `/public/image/`. Add the provided image files there using the exact filenames supplied for the project. The 2027 brochure PDF is already included at:

`/public/image/Odisha-Mining-Expo-2027-Brochure.pdf`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and add server-side values:

- `MONGODB_URI` — MongoDB Atlas connection string.
- `EMAIL_HOST` — SMTP host. Defaults to `smtp.gmail.com`.
- `EMAIL_PORT` — SMTP port. Defaults to `465`.
- `EMAIL_USER` — Gmail account used to send website notifications.
- `EMAIL_PASS` — Gmail App Password. Do not use your normal Google password.
- `MAIL_TO_1` — first admin notification address.
- `MAIL_TO_2` — second admin notification address.
- `GOOGLE_SHEET_ID` — destination Google Sheet ID.
- `GOOGLE_CREDENTIALS_BASE64` — Base64-encoded Google service-account JSON.

Do not prefix private values with `NEXT_PUBLIC_`.

## MongoDB setup

1. Create or use a MongoDB Atlas cluster.
2. Create a database user with appropriate write access.
3. Allow the deployment environment to reach the cluster through Atlas Network Access.
4. Set `MONGODB_URI` in the deployment environment.

The API handlers use the `futurex` database and these collections:

- `contacts`
- `exhibitors`
- `visitors`
- `brochure_downloads`

## Gmail setup

1. Enable 2-Step Verification on the sender Google account.
2. Create a Google App Password.
3. Put the Gmail address in `EMAIL_USER` and the App Password in `EMAIL_PASS`.
4. Set `MAIL_TO_1` and `MAIL_TO_2` for the two admin recipients.

## Google Sheets setup

1. Enable the Google Sheets API for the service-account project.
2. Share the target Google Sheet with the service-account email as an editor.
3. Base64-encode the complete service-account JSON and set it as `GOOGLE_CREDENTIALS_BASE64`.
4. Set `GOOGLE_SHEET_ID`.

The integration preserves the shared tab name `Website Enquries`. It reads the actual first-row headers and writes values in that header order, starting from column A on the next available row.

## Brochure flow

`/brochure` captures name, email, company and phone, stores the request in MongoDB, writes it to Google Sheets, sends admin email notifications, and then opens the supplied 2027 brochure PDF.

## Deployment

Deploy to a Node.js-compatible Next.js host. Add every variable from `.env.example` in the production environment. Do not commit `.env`, credentials, Gmail App Passwords, MongoDB credentials or Google private keys.

Before launch, copy every supplied image into `/public/image/` with the exact filename expected by the code and verify all forms against the production MongoDB, Google Sheet and Gmail account.
