// const jwt = require("jsonwebtoken");
// const UserModels = require("../Models/User")
// const bcrypt = require("bcrypt");
// const {sendEmail} = require("../Utils/email")
// require("dotenv").config();

// // SignUp logic for both Admin and User
// exports.signUp = async (req, res) => {
//     try {
//         const { name, email, password, role, phoneNo } = req.body;

//         // Validate required fields
//         if (!name || !email || !password || !role || !phoneNo) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "All fields are required"
//             });
//         }

//         // Prevent signup for admin email if the role is not "admin"
//         if (role === "Admin" && email !== process.env.ADMIN_MAIL) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "Only authorized users can create an admin account"
//             });
//         }

//         // Check if email already exists
//         const verifyEmail = await UserModels.findOne({ email });
//         if (verifyEmail) {
//             return res.status(409).json({
//                 success: false,
//                 msg: "Email already exists. Please use a different email"
//             });
//         }

//         // Hash the password
//         let hashPassword;
//         if (password) {
//             hashPassword = await bcrypt.hash(password, 10);
//         } else {
//             return res.status(505).json({
//                 success: false,
//                 msg: "Error in hashing"
//             });
//         }

//         // Store the user data in DB
//         const storeData = await UserModels.create({ name, email, password: hashPassword, role, phoneNo });
        
//         // Send email after signup
//         await sendEmail(
//             email,
//             "SignUp Notification",
//             `
//             <h3>Welcome to Health Life Insurance, ${name}!</h3>
//             <p>Thank you for signing up with us. We’re excited to help you manage your health insurance needs.</p>
//             <p>Explore our features, including policy management, claim submissions, and real-time tracking.</p>
//             <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>
//             <p>Warm regards,<br>The Health Care Team</p>`
//         );

//         // Success response
//         res.status(201).json({
//             success: true,
//             msg: "User registered successfully",
//             response: storeData
//         });
//     } catch (err) {
//         console.error("Error during signup:", err);
//         // Handle server-side error
//         res.status(500).json({
//             success: false,
//             msg: "An error occurred during signup. Please try again later."
//         });
//     }
// };



// // Login logic for both Admin and User
// exports.login = async (req, res) => {
//     try {
//         const { email, password, portal } = req.body;

//         // Validate required fields
//         if (!email || !password || !portal) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "Email, password, and portal are required"
//             });
//         }

//         // Find the user by email
//         const user = await UserModels.findOne({ email });
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "User not found. Please signup first."
//             });
//         }

//         // Verify the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 msg: "Invalid Email & Password"
//             });
//         }

//         // Prevent login for multiple admin accounts
//         if (user.role === "Admin" && portal !== "admin") {
//             return res.status(403).json({
//                 success: false,
//                 msg: "Admins can only login to the admin portal"
//             });
//         }

//         if (user.role === "User" && portal !== "user") {
//             return res.status(403).json({
//                 success: false,
//                 msg: "Users can only login to the user portal"
//             });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

//         // Remove sensitive data like password from the response
//         const userResponse = { ...user.toObject() };  // Convert Mongoose document to plain object
//         delete userResponse.password;  // Remove password from the user object
//         userResponse.token = token;   // Add token to the user object

//         // Send email after login
//         await sendEmail(
//             email,
//             "Login Notification",
//             `
//             <h2>Hi, ${user.name}!</h2>
//             <p>You have successfully logged in to the Health Life Insurance,.</p>
//             <p>If this wasn’t you, please contact our support team immediately at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>`
//         );

//         const cookieOptions = {
//             httpOnly: true,          // Prevent client-side access to the cookie
//             secure: process.env.NODE_ENV === "production", // Use HTTPS in production
//             sameSite: "strict",      // Prevent cross-site request forgery
//             maxAge: 60 * 60 * 1000,  // Cookie expires in 1 hour
//         };

//         // Send response with cookie
//         res.status(200).cookie("token", token, cookieOptions).json({
//             success: true,
//             token,
//             user: userResponse,
//             msg: "User logged in successfully"
//         });
//     } catch (err) {
//         console.error("Error during login:", err);
//         res.status(500).json({
//             success: false,
//             msg: "An error occurred during login. Please try again later."
//         });
//     }
// };



const UserModels = require("../Models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../Utils/email")
require("dotenv").config();

exports.userSignUp = async (req,res) => {

    try{

        const {name, email,phoneNo, password } = req.body;

            // Validate required fields
        if (!name || !email || !phoneNo || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        const verifyEmail = await UserModels.findOne({email});
        
        if(verifyEmail) {
            return res.status(409).json({ success: false, msg: "Email already exists. Please use a different email" });
        }


        let hashPassword;
        if(password) {
            hashPassword = await bcrypt.hash(password, 10)
        } else {
            return res.status(505).json({ success:false, msg:"Error in hashing" })
        }

        const response = await UserModels.create({ name, email, phoneNo, password:hashPassword});
        console.log(`Your response Here ${response}`);


        // Send email after signup
        await sendEmail(
            email,
            "SignUp Notification",
            `
            <h3>Welcome to Health Life Insurance, ${name}!</h3>
            <p>Thank you for signing up with us. We’re excited to help you manage your health insurance needs.</p>
            <p>Explore our features, including policy management, claim submissions, and real-time tracking.</p>
            <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@healthcare.com">support@healthcare.com</a>.</p>
            <p>Warm regards,<br>The Health Care Team</p>`
        );

        // Success response
        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            response: storeData
        });
        

    } catch (err) {
        console.error("Error during Signup:", err);
        res.status(500).json({
            success: false,
            msg: "An error occurred during Signup. Please try again later."
        });
    }

};



exports.