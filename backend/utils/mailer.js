const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send password reset OTP by email
async function sendPasswordResetOTP(email, otp) {
  return transporter.sendMail({
    from: `"CAMS Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "CAMS - Password Reset OTP",
    text: `Your CAMS password reset OTP is ${otp}.

This OTP is valid for 5 minutes.

If you did not request a password reset, please ignore this email.

CAMS Support`,
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <h2 style="color: #1e3a8a;">CAMS Password Reset</h2>
                <p>You requested to reset your CAMS account password.</p>
                <p>Your OTP is:</p>
                <div style="font-size: 30px; font-weight: bold; letter-spacing: 8px; padding: 16px; background: #f3f4f6; text-align: center;">
                    ${otp}
                </div>
                <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                <p>If you did not request this, please ignore this email.</p>
                <hr>
                <p style="color: #6b7280;">CAMS Support</p>
            </div>
        `,
  });
}

module.exports = {
  transporter,
  sendPasswordResetOTP,
};
