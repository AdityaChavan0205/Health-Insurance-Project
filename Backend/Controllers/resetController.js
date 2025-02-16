const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           ${resetUrl}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Email could not be sent" });
        }
        res.status(200).json({ success: true, message: "Reset link sent successfully" });
    });
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Password reset token is invalid or has expired" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
};