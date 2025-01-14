const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModels = require("../models/User");
const { sendEmail } = require("../utils/email");
const otpGenerator = require("otp-generator");

// User signup and OTP generation
exports.userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const existingUser = await UserModels.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, msg: "Email already exists." });
        }

        // Generate OTP and expiry time
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Save the user to the database with otp and expiry
        const user = await UserModels.create({
            name,
            email,
            password: hashPassword,
            otp,
            otpExpiry,
            isVerified: false, // User is not verified until OTP is validated
        });

        // Send OTP via email
        await sendEmail(email, "OTP Verification", `<span>Your OTP is <strong>${otp}</strong>. It is valid for 5 minutes.</span>`);

        res.status(201).json({
            success: true,
            msg: "User registered successfully. Please verify OTP sent to your email.",
            userId: user._id
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, msg: "Error during signup. Please try again later." });
    }
};




// Verify OTP and create the user account
exports.verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Validation
        if (!userId || !otp) {
            return res.status(400).json({ success: false, msg: "User ID and OTP are required." });
        }

        const user = await UserModels.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found." });
        }

        // Validate OTP
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, msg: "Invalid or expired OTP." });
        }

        // Clear OTP fields and mark the user as verified
        user.otp = null;
        user.otpExpiry = null;
        user.isVerified = true;
        await user.save();

        res.status(200).json({
            success: true,
            msg: "OTP verified successfully. You can now log in."
        });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ success: false, msg: "Error during OTP verification. Please try again later." });
    }
};




// User Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Email and password are required." });
        }

        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found. Please sign up first." });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(400).json({ success: false, msg: "Please verify your OTP before logging in." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: "User" }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // Remove sensitive data like password from the response
        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        userResponse.token = token;

        // Send response with cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        };

        res.status(200).cookie("token", token, cookieOptions).json({
            success: true,
            token,
            user: userResponse,
            msg: "User logged in successfully"
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({
            success: false,
            msg: "An error occurred during login. Please try again later."
        });
    }
};




// Admin Login (same as before)
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve admin credentials from environment variables
        const adminEmail = process.env.ADMIN_MAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD;

        if (email !== adminEmail) {
            return res.status(401).json({ success: false, msg: "Invalid admin email." });
        }

        const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, msg: "Invalid admin password." });
        }

        // Generate JWT token for admin
        const token = jwt.sign({ email, role: "Admin" }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        }).json({
            success: true,
            msg: "Admin logged in successfully.",
            token,
        });
    } catch (err) {
        console.error("Error during admin login:", err.message);
        res.status(500).json({
            success: false,
            msg: "An error occurred during admin login. Please try again later.",
        });
    }
};
