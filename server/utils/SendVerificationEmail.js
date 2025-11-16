import nodemailer from "nodemailer";

export async function sendVerificationEmail({ to, name, verifyURL }) {
  const appName = process.env.APP_NAME || "BloomCraft";

  // ✅ Inline HTML template (no file system access)
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial; padding: 20px; background: #f8faf9;">
      <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color:#333;">Hi ${name},</h2>
        <p>Thank you for joining <strong>${appName}</strong>.</p>
        <p>Please click the button below to verify your email address:</p>

        <a href="${verifyURL}" 
           style="display:inline-block; margin-top:20px; padding:12px 24px; background:#4F8C71; color:#fff; text-decoration:none; border-radius:8px;">
          Verify Email
        </a>

        <p style="margin-top:30px;">If the button doesn't work, use this link:</p>
        <p><a href="${verifyURL}" style="color:#4F8C71;">${verifyURL}</a></p>

        <hr style="margin:40px 0;">
        <p style="font-size:12px; color:#777;">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;

  // ✅ Nodemailer configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ✅ Send email
  await transporter.sendMail({
    from: `"${appName}" <${process.env.SMTP_USER}>`,
    to,
    subject: `${appName} — Verify Your Email`,
    html: htmlContent,
    text: `Hello ${name}, please verify your email by clicking this link: ${verifyURL}`,
  });
}
import nodemailer from "nodemailer";

export async function sendVerificationEmail({ to, name, verifyURL }) {
  const appName = process.env.APP_NAME || "BloomCraft";

  // ✅ Inline HTML template (no file system access)
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial; padding: 20px; background: #f8faf9;">
      <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color:#333;">Hi ${name},</h2>
        <p>Thank you for joining <strong>${appName}</strong>.</p>
        <p>Please click the button below to verify your email address:</p>

        <a href="${verifyURL}" 
           style="display:inline-block; margin-top:20px; padding:12px 24px; background:#4F8C71; color:#fff; text-decoration:none; border-radius:8px;">
          Verify Email
        </a>

        <p style="margin-top:30px;">If the button doesn't work, use this link:</p>
        <p><a href="${verifyURL}" style="color:#4F8C71;">${verifyURL}</a></p>

        <hr style="margin:40px 0;">
        <p style="font-size:12px; color:#777;">
          © ${new Date().getFullYear()} ${appName}. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;

  // ✅ Nodemailer configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ✅ Send email
  await transporter.sendMail({
    from: `"${appName}" <${process.env.SMTP_USER}>`,
    to,
    subject: `${appName} — Verify Your Email`,
    html: htmlContent,
    text: `Hello ${name}, please verify your email by clicking this link: ${verifyURL}`,
  });
}
