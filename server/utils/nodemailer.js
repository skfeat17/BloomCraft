// import nodemailer from "nodemailer";
// import ejs from "ejs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Get directory of this file (ESM compatible)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export async function sendEmail({ to, name, otp }) {
//   // ✅ Safe absolute path (works on Vercel and locally)
//   const templatePath = path.resolve(__dirname, "utils", "otp-template.ejs");

//   const htmlContent = await ejs.renderFile(templatePath, {
//     name,
//     OTP: otp,
//     appName: process.env.APP_NAME,
//     expiryMinutes: 10,
//     supportEmail: "",
//     year: new Date().getFullYear(),
//   });

//   // Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   // Send mail
//   await transporter.sendMail({
//     from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
//     to,
//     subject: `${process.env.APP_NAME} — Your OTP Code`,
//     html: htmlContent,
//     text: `Hi ${name}, your OTP is ${otp}. It expires in 10 minutes.`,
//   });
// }


import nodemailer from "nodemailer";

export async function sendEmail({ to, name, otp }) {
  const appName = process.env.APP_NAME || "BloomCraft";
  const expiryMinutes = 10;

  // ✅ Inline HTML (no EJS needed anymore)
  const htmlContent = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${appName} — One Time Password</title>
    </head>
    <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:24px;">
        <h2 style="margin-top:0;">Hi ${name},</h2>
        <p>Your One Time Password (OTP) is:</p>

        <div style="font-size:28px; font-weight:bold; letter-spacing:4px; background:#f7f9fc; padding:18px; border-radius:8px; border:1px dashed #ccc; text-align:center;">
          ${otp}
        </div>

        <p style="margin-top:20px;">
          This code is valid for ${expiryMinutes} minutes.<br>
          If you didn’t request this, please ignore this email.
        </p>

        <hr style="margin:20px 0;">
        <p style="font-size:12px; color:#555;">
          &copy; ${new Date().getFullYear()} ${appName}. Need help? Contact support@${appName.toLowerCase()}.com
        </p>
      </div>
    </body>
  </html>
  `;

  // ✅ Nodemailer setup
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ✅ Send the email
  await transporter.sendMail({
    from: `"${appName}" <${process.env.SMTP_USER}>`,
    to,
    subject: `${appName} — Your OTP Code`,
    html: htmlContent,
    text: `Hi ${name}, your OTP is ${otp}. It expires in ${expiryMinutes} minutes.`,
  });
}
