import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export async function sendVerificationEmail({ to, name, verifyURL }) {
  // compile template
  const templatePath = path.join(process.cwd(), "utils", "verify-template.ejs");

  const htmlContent = await ejs.renderFile(templatePath, {
    name,
    verifyURL,
    appName: process.env.APP_NAME,
    year: new Date().getFullYear(),
  });

  // Nodemailer transporter (same as your OTP sender)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: `${process.env.APP_NAME} — Verify Your Email`,
    html: htmlContent,
    text: `Hello ${name}, please verify your email by clicking this link: ${verifyURL}`,
  });
}
