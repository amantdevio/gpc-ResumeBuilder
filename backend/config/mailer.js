const getTransport = async () => {
  let nodemailer;
  try {
    // Lazy-load so backend can still boot even if package is not installed yet.
    // This gives a clean API error instead of complete server crash.
    nodemailer = (await import("nodemailer")).default;
  } catch (error) {
    throw new Error("Mailer dependency missing. Run: npm install nodemailer");
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new Error("SMTP_USER and SMTP_PASS are required");
  }

  if (process.env.SMTP_SERVICE) {
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host) {
    throw new Error("SMTP_HOST is required when SMTP_SERVICE is not set");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

export const sendRegisterOtpMail = async ({ toEmail, userName, otp }) => {
  const transporter = await getTransport();
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: "Your OTP for Resume Builder Registration",
    text: `Hi ${userName}, your OTP is ${otp}. It is valid for 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827;">
        <h2 style="margin:0 0 12px;">Resume Builder - Registration OTP</h2>
        <p>Hi ${userName},</p>
        <p>Your OTP for account registration is:</p>
        <p style="font-size:24px; font-weight:700; letter-spacing:4px; margin:12px 0;">${otp}</p>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};
