const UserModels = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");

// User signup and OTP generation
exports.userSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const existingUser = await UserModels.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, msg: "Email already exists." });
        }

        // Admin Cannot be registered as a user
        if(process.env.ADMIN_MAIL === email) {
            return res.status(409).json({ success: false, msg: "This email is already registered as an admin." });
        }

        // Generate OTP and expiry time
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Save the user to the database with otp and expiry
        const user = await UserModels.create({
            firstName,
            lastName,
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

        await user.save(); // Save the updated user to the database

        // Send welcome email
        await sendEmail(
            user.email,
            "SignUp Notification",
            `
            <h3>Welcome to Health Life Insurance, ${user.name}!</h3>
            <p>Thank you for signing up with us. We’re excited to help you manage your health insurance needs.</p>
            <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>
            <p>Warm regards,<br>The Health Care Team</p>`
        );

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

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Email and password are required." });
        }

        // Admin Cannot be Login as a user
        if(process.env.ADMIN_MAIL === email) {
            return res.status(409).json({ success: false, msg: "This email is already registered as an admin." });
        }

        // Fetch user
        3
        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found. Please sign up first." });
        }

        

        // Log user data for debugging
        console.log("Login User Data:", user);

        // Check verification status
        if (!user.isVerified) {
            return res.status(400).json({ success: false, msg: "Please verify your OTP before logging in." });
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
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // Send Login Notification
        await sendEmail(
            user.email,
            "Login Notification",
            `
            <h3>Hello ${user.name},</h3>
            <p>We noticed a login to your Health Life Insurance account.</p>
            <p>If this was you, you can safely disregard this email. However, if you did not initiate this login, please secure your account immediately by resetting your password.</p>
            <p>For assistance, contact our support team at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>
            <p>Stay safe,<br>The Health Care Team</p>
            `
        );

        // Send success response
        res.status(200).json({
            success: true,
            msg: "Login successful.",
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, msg: "Error during login. Please try again later." });
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

         // Send Login Notification
         await sendEmail(
            email,
            "Login Notification",
            `
            <h3>Hello Admin,</h3>
            <p>We noticed a login to your <strong>Health Life Insurance</strong> account.</p>
            <p>If this login was initiated by you, no further action is required. However, if you did not initiate this login, please secure your account immediately by resetting your password.</p>
            <p>For assistance, you can contact our support team at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>
            <p>Stay safe,</p>
            <p><strong>The Health Care Team</strong></p>
            `
        );

    } catch (err) {
        console.error("Error during admin login:", err.message);
        res.status(500).json({
            success: false,
            msg: "An error occurred during admin login. Please try again later.",
        });
    }
};
