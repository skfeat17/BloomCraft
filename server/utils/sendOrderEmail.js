import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export async function sendOrderConfirmationEmail({ to, user, order, shipping }) {
    console.log("Sending order confirmation email to:", to);
  // Path to EJS template
  const templatePath = path.join(process.cwd(), "utils", "OrderConfirmation.ejs");

  // Render EJS template with dynamic data
  const htmlContent = await ejs.renderFile(templatePath, {
    user,
    order,
    shipping,
    appName: process.env.APP_NAME,
  });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // false for TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your ShiCraft Order is Confirmed!",
    html: htmlContent,
    text: `Hi ${user.firstName}, your order #${order._id} has been confirmed!`,
  });
}
