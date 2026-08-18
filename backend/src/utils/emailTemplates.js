const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export const createEnquiryThankYouEmail = ({ name, subject }) => {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);

  return {
    subject: "Thank you for contacting UNBAIQ",
    text: `Hi ${name},\n\nThank you for reaching out to UNBAIQ.\n\nWe have received your enquiry regarding "${subject}". Our team will review your message and get back to you shortly.\n\nRegards,\nTeam UNBAIQ`,
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Thank you for contacting UNBAIQ</title>
        </head>
        <body style="margin:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#294861;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fa;padding:32px 16px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 28px rgba(6,70,117,0.10);">
                  <tr>
                    <td style="background:#064675;padding:24px 32px;color:#ffffff;font-size:24px;font-weight:700;">
                      UNBAIQ
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px;">
                      <h1 style="margin:0 0 20px;color:#063d6b;font-size:24px;line-height:1.3;">Thank you for reaching out</h1>
                      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hi ${safeName},</p>
                      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">We have received your enquiry regarding <strong>&ldquo;${safeSubject}&rdquo;</strong>.</p>
                      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;">Our team will review your message and get back to you shortly.</p>
                      <p style="margin:0;font-size:16px;line-height:1.7;color:#063d6b;"><strong>Regards,<br />Team UNBAIQ</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#eef4f8;padding:18px 32px;color:#60778a;font-size:12px;line-height:1.5;text-align:center;">
                      This is an automatic acknowledgement of your enquiry.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
};
