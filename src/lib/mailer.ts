import nodemailer from "nodemailer";

export const transporter =
  nodemailer.createTransport({
    pool: true,

    host:
      process.env.EMAIL_HOST ||
      "smtp.gmail.com",

    port: Number(
      process.env.EMAIL_PORT ||
        "465"
    ),

    secure: true,

    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },

    maxConnections: 5,
    maxMessages: 100,

    rateDelta: 1000,
    rateLimit: 5,

    connectionTimeout:
      10_000,
    greetingTimeout:
      10_000,
    socketTimeout:
      20_000,
  });

export function mailRecipients() {
  return [
    process.env.MAIL_TO_1,
    process.env.MAIL_TO_2,
  ].filter(Boolean) as string[];
}