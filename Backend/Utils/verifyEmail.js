const nodemailer = require("nodemailer");

exports.sendEmail = async (email, otp, firstName) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email - Health Life Insurance",
            html: `<div style="max-width: 420px; margin: auto; font-family: Arial, sans-serif; font-size: 15px; color: #333; background-color: #f9f9f9; padding: 15px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; padding-bottom: 10px;">
                    <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 100px;">
                </div>
                
                <h2 style="text-align: center; color: #007BFF;">Verify Your Email</h2>

                <p>Dear <strong>${firstName}</strong>,</p>
                <p>Use the OTP below to verify your email and secure your Health Life Insurance account:</p>

                <div style="text-align: center; margin: 15px auto; padding: 8px 12px; background: #ffffff; border-radius: 6px; border: 2px dashed #007BFF; width: 180px;">
                    <p style="font-size: 22px; font-weight: bold; color: #007BFF; letter-spacing: 5px; margin: 0;">
                      ${otp.split('').join(' ')}
                    </p>
                </div>

                <p style="text-align: center; font-weight: bold;">Valid for <span style="color: red;">5 minutes</span>.</p>

                <div style="background: #ffeaea; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                    <p style="color: red; font-weight: bold; text-align: center;">⚠ Do NOT share this OTP with anyone!</p>
                </div>

                <p style="text-align: center;">If you didn't request this OTP, ignore this email or contact our support team.</p>

                <div style="text-align: center; background: #f1f1f1; padding: 8px; border-radius: 6px;">
                    <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
                    <p style="margin: 0;"><strong>📞 +1 234 567 890</strong></p>
                </div>

                <br>
                <p>Best Regards,</p>
                <p><strong>Health Life Insurance Pvt. Ltd.</strong></p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin-top: 15px;">
                <p style="font-size: 11px; color: #777; text-align: center;">This email was sent to ${email} for authentication purposes.</p>
            </div>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email Send Error:", error);
    }
};
