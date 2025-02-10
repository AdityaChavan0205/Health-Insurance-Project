const nodemailer = require("nodemailer");
require("dotenv").config();


// Create reusable transporter for email sending
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    service: process.env.MAIL_SERVICE || "Gmail", // Supports both SMTP & Gmail
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});


// Generic Email Sending Function
exports.sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Health Life Insurance" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`✅ Email sent successfully to ${to}`);
        return true;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return false;
    }
};


// OTP Email Function (Calls sendEmail)
exports.sendOtpEmail = async (email, otp, firstName, lastName) => {
    const subject = "Verify Your Email - Health Life Insurance";
    const html = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; overflow: hidden;">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 120px;">
        </div>

        <!-- Heading -->
        <h2 style="text-align: center; color: #007BFF; font-size: 24px; margin-bottom: 10px;">Verify Your Email</h2>

        <!-- Message -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 15px;">Dear <strong>${firstName} ${lastName}</strong>,</p>
        <p style="text-align: center; font-size: 16px;">Use the OTP below to verify your email and secure your Health Life Insurance account:</p>
        
        <!-- OTP Box -->
        <div style="display: flex; justify-content: center; align-items: center; margin: 20px auto; padding: 12px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #007BFF; width: 100%; max-width: 280px;">
          <p style="font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 8px; text-align: center; margin: 0; width: 100%;">
              ${otp.split('').join(' ')}
           </p>
        </div>

        <!-- Validity Info -->
        <p style="text-align: center; font-weight: bold; margin: 10px 0;">Valid for <span style="color: red;">5 minutes</span>.</p>

        <!-- Security Warning -->
        <div style="background: #ffeaea; padding: 12px; border-radius: 6px; margin-bottom: 15px; text-align: center;">
            <p style="color: red; font-weight: bold;">⚠ Do NOT share this OTP with anyone!</p>
        </div>

        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px;">If you didn't request this OTP, ignore this email or contact our support team.</p>

        <div style="text-align: center; background: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
            <p style="margin: 0;"><strong>📞 +91 22 4017 8571</strong></p>
        </div>

        <!-- Footer -->
        <br>
        <p style="text-align: center;">Best Regards,</p>
        <p style="text-align: center;"><strong>Health Life Insurance Pvt. Ltd.</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${email} for authentication purposes.</p>
    </div>

    <!-- Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            div {
                padding: 15px !important;
            }
            h2 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
            .otp-box {
                font-size: 20px !important;
                letter-spacing: 4px !important;
            }
        }
    </style>`;

    return await exports.sendEmail(email, subject, html);
};


// Welcome Email Function
exports.sendWelcomeEmail = async (email, firstName, lastName) => {
    const subject = "Welcome to Health Life Insurance!";

    const html = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; overflow: hidden;">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 120px;">
        </div>

        <!-- Heading -->
        <h2 style="text-align: center; color: #007BFF; font-size: 24px; margin-bottom: 10px;">Welcome to Health Life Insurance!</h2>

        <!-- Message -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 15px;">Dear <strong>${firstName} ${lastName}</strong>,</p>
        <p style="text-align: center; font-size: 16px;">Thank you for signing up! We're excited to have you onboard.</p>

        <!-- Benefits Section -->
        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 1px solid #007BFF; margin: 20px 0;">
            <h3 style="text-align: center; color: #007BFF;">🔹 What You Get</h3>
            <ul style="list-style: none; padding: 0; text-align: center;">
                <li>✔ Easy Health Insurance Management</li>
                <li>✔ 24/7 Customer Support</li>
                <li>✔ Secure & Trusted Services</li>
            </ul>
        </div>

        <!-- Next Steps -->
        <p style="text-align: center; font-size: 16px;">You can now explore your dashboard and get started.</p>

        <!-- Dashboard Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://healthlife.com/dashboard" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
        </div>

        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px;">Need help? Contact our support team anytime.</p>

        <div style="text-align: center; background: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
            <p style="margin: 0;"><strong>📞 +91 22 4017 8571</strong></p>
        </div>

        <!-- Footer -->
        <br>
        <p style="text-align: center;">Best Regards,</p>
        <p style="text-align: center;"><strong>Health Life Insurance Pvt. Ltd.</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${email} as a welcome message.</p>
    </div>

    <!-- Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            div {
                padding: 15px !important;
            }
            h2 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
        }
    </style>`;

    return await exports.sendEmail(email, subject, html);
};


// Send Login Notification Email
exports.sendLoginNotification = async (email, firstName, lastName) => {
    const subject = "Login Notification - Health Life Insurance";

    const html = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; overflow: hidden;">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 120px;">
        </div>

        <!-- Heading -->
        <h2 style="text-align: center; color: #007BFF; font-size: 24px; margin-bottom: 10px;">Login Notification</h2>

        <!-- Message -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 15px;">Dear <strong>${firstName} ${lastName}</strong>,</p>
        <p style="text-align: center; font-size: 16px;">We detected a login to your Health Life Insurance account.</p>

        <!-- Security Warning -->
        <div style="background: #ffeaea; padding: 12px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="color: red; font-weight: bold;">⚠ If you did not log in, reset your password immediately!</p>
        </div>

        <!-- Reset Password Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://healthlife.com/reset-password" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>

        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px;">If you have any concerns, contact our support team.</p>

        <div style="text-align: center; background: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
            <p style="margin: 0;"><strong>📞 +91 22 4017 8571</strong></p>
        </div>

        <!-- Footer -->
        <br>
        <p style="text-align: center;">Best Regards,</p>
        <p style="text-align: center;"><strong>Health Life Insurance Pvt. Ltd.</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${email} for security purposes.</p>
    </div>

    <!-- Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            div {
                padding: 15px !important;
            }
            h2 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
        }
    </style>`;

    return await exports.sendEmail(email, subject, html);
};

// Forget Notification Email
exports.userForgetPassword = async (email, firstName, lastName, resetLink) => {
    const subject = "Forget Password Request - Health Life Insurance";

    const html = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; overflow: hidden;">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 120px;">
        </div>

        <!-- Heading -->
        <h2 style="text-align: center; color: #007BFF; font-size: 24px; margin-bottom: 10px;"> Forget Password Request </h2>

        <!-- Message -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 15px;">Dear <strong>${firstName} ${lastName}</strong>,</p>
        <p style="text-align: center; font-size: 16px;">You requested a password reset for your account. Click the link below to reset your password:</p>

        <!-- Reset Password Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>

        <!-- Security Warning -->
        <div style="background: #ffeaea; padding: 12px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="color: red; font-weight: bold;">⚠ If you did not request this, please ignore this email or contact support.</p>
        </div>

        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px;">If you have any concerns, contact our support team:</p>

        <div style="text-align: center; background: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
            <p style="margin: 0;"><strong>📞 +91 22 4017 8571</strong></p>
        </div>

        <!-- Footer -->
        <br>
        <p style="text-align: center;">Best Regards,</p>
        <p style="text-align: center;"><strong>Health Life Insurance Pvt. Ltd.</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${email} for security purposes.</p>
    </div>

    <!-- Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            div {
                padding: 15px !important;
            }
            h2 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
        }
    </style>`;

    return await exports.sendEmail(email, subject, html);
};


exports.sendAdminLoginNotification = async (email) => {
    const subject = "🚨 Admin Login Alert - Health Life Insurance";

    const html = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; overflow: hidden;">

        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-57bac524-6254-4fc8-a395-671c0a14153b-6MOww.jpg" alt="Health Life Insurance Logo" style="max-width: 120px;">
        </div>

        <!-- Heading -->
        <h2 style="text-align: center; color: #DC3545; font-size: 24px; margin-bottom: 10px;">🚨 Admin Login Alert</h2>

        <!-- Message -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 15px;">Dear <strong>Admin</strong>,</p>
        <p style="text-align: center; font-size: 16px;">An admin login was detected on your Health Life Insurance account.</p>

        <!-- Security Warning -->
        <div style="background: #ffeaea; padding: 12px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="color: red; font-weight: bold;">⚠ If you did not initiate this login, secure your account immediately!</p>
        </div>

        <!-- Secure Account Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://healthlife.com/reset-password" style="background-color: #DC3545; color: #ffffff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Secure Your Account</a>
        </div>

        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px;">If you have any concerns, contact our support team.</p>

        <div style="text-align: center; background: #f1f1f1; padding: 10px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📧 support@healthlife.com</strong></p>
            <p style="margin: 0;"><strong>📞 +91 22 4017 8571</strong></p>
        </div>

        <!-- Footer -->
        <br>
        <p style="text-align: center;">Best Regards,</p>
        <p style="text-align: center;"><strong>Health Life Insurance Pvt. Ltd.</strong></p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This email was sent to ${email} for security purposes.</p>
    </div>

    <!-- Responsive Styles -->
    <style>
        @media only screen and (max-width: 600px) {
            div {
                padding: 15px !important;
            }
            h2 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
        }
    </style>`;

    return await exports.sendEmail(email, subject, html);
};


