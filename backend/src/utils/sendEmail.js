import nodemailer from "nodemailer";

import { createEnquiryThankYouEmail } from "./emailTemplates.js";

let transporter;

const getMailConfiguration = () => {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be configured");
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  };
};

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport(getMailConfiguration());
  }

  return transporter;
};

export const sendEnquiryThankYouEmail = async (enquiry) => {
  const content = createEnquiryThankYouEmail(enquiry);
  const from = process.env.MAIL_FROM?.trim() || process.env.SMTP_USER?.trim();
  const replyTo = process.env.MAIL_REPLY_TO?.trim() || process.env.SMTP_USER?.trim();

  return getTransporter().sendMail({
    from,
    to: enquiry.email,
    replyTo,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
};
