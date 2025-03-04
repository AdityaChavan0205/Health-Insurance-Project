const UserModels = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const { sendEmail, sendOtpEmail, sendWelcomeEmail, sendLoginNotification, userForgetPassword, sendAdminLoginNotification } = require("../Utils/email");


// User signup and OTP generation
exports.userSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res
                .status(400)
                .json({ success: false, msg: "All fields are required" });
        }

        const existingUser = await UserModels.findOne({ email });

        // Admin Cannot be registered as a user
        if (process.env.ADMIN_MAIL === email) {
            return res.status(409).json({
                success: false,
                msg: "This email is already registered as an admin.",
            });
        }

        if (existingUser) {
            if (!existingUser.isVerified) {
                // Regenerate OTP for the unverified user
                const otp = otpGenerator.generate(6, {
                    digits: true,
                    alphabets: false,
                    specialChars: false,
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                });

                existingUser.otp = otp;
                existingUser.otpExpiry = Date.now() + 5 * 60 * 1000;
                await existingUser.save();

                await sendOtpEmail(email, otp, firstName, lastName);
                return res.status(200).json({
                    success: true,
                    userId: existingUser._id,
                    msg: "OTP resent. Please verify your email.",
                });
            }
            return res
                .status(409)
                .json({ success: false, msg: "Email already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const otp = otpGenerator.generate(6, {
            digits: true,
            alphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
        });
        const otpExpiry = Date.now() + 5 * 60 * 1000;

        const user = await UserModels.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            otp,
            otpExpiry,
            isVerified: false,
        });

        await sendOtpEmail(email, otp, firstName, lastName);
        res.status(201).json({
            success: true,
            msg: "User registered successfully. Please verify OTP.",
            userId: user._id,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            success: false,
            msg: "Error during signup. Please try again later.",
        });
    }
};

// Verify OTP and create the user account
exports.verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Validation
        if (!userId || !otp) {
            return res
                .status(400)
                .json({ success: false, msg: "User ID and OTP are required." });
        }

        const user = await UserModels.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found." });
        }

        // Validate OTP
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res
                .status(400)
                .json({ success: false, msg: "Invalid or expired OTP." });
        }

        // Clear OTP fields and mark the user as verified
        user.otp = null;
        user.otpExpiry = null;
        user.isVerified = true;

        await user.save();

        // Send welcome email
        await sendWelcomeEmail(user.email, user.firstName, user.lastName);

        res.status(200).json({
            success: true,
            msg: "OTP verified successfully. You can now log in.",
        });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({
            success: false,
            msg: "Error during OTP verification. Please try again later.",
        });
    }
};

// User Login
exports.userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    msg: "Email and password are required."
                }
            );
        }

        // Admin Cannot be Login as a user
        if (process.env.ADMIN_MAIL === email) {
            return res.status(409).json({
                success: false,
                msg: "This email is already registered as an admin."
            });
        }

        // Fetch user
        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found. Please sign up first." });
        }

        // Log user data for debugging
        console.log("Login User Data:", user);

        // Check verification status
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                msg: "Please verify your OTP before logging in.",
            })
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: "Invalid email or password." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // Set JWT as HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Send Login email
        await sendLoginNotification(user.email, user.firstName, user.lastName);

        res.status(200).json({
            success: true,
            msg: "Login successful.",
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            msg: "Error during login. Please try again later.",
        });
    }
};

// forget User Password
exports.userForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email input
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Email is required to reset your password.",
            });
        }

        // Find user by email
        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No account found with that email address.",
            });
        }

        // Check if the user is verified before allowing password reset
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                msg: "Please verify your account before resetting your password.",
            });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Save the reset token and expiration time (15 minutes)
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send password reset email
        await userForgetPassword(
            email,
            user.firstName,
            user.lastName,
            resetLink
        );

        res.status(200).json({
            success: true,
            msg: "Password reset email sent successfully. Please check your inbox.",
        });
    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).json({
            success: false,
            msg: "An error occurred while processing your password reset request. Please try again later.",
        });
    }
};

// Reset User Password
exports.resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { newPassword } = req.body;

        // Validate input
        if (!newPassword) {
            return res.status(400).json({
                success: false,
                msg: "Please provide a new password.",
            });
        }

        // Hash the token to compare with database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Find user with valid token and expiration
        const user = await UserModels.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Invalid or expired password reset token.",
            });
        }

        // Hash new password and update user
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            msg: "Password has been reset successfully.",
        });

    } catch (error) {
        console.error("Password Reset Error:", error);
        res.status(500).json({
            success: false,
            msg: "Error resetting password. Please try again later.",
        });
    }
};
// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve admin credentials from environment variables
        const adminEmail = process.env.ADMIN_MAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD;

        if (email !== adminEmail) {
            return res
                .status(401)
                .json({ success: false, msg: "Invalid admin email." });
        }

        const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, msg: "Invalid admin password." });
        }

        // Generate JWT token for admin
        const token = jwt.sign({ email, role: "Admin" }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            })
            .json({
                success: true,
                msg: "Admin logged in successfully.",
                token,
            });

        // Send Login Notification
        await sendAdminLoginNotification(adminEmail);


    } catch (err) {
        console.error("Error during admin login:", err.message);
        res.status(500).json({
            success: false,
            msg: "An error occurred during admin login. Please try again later.",
        });
    }
}; 