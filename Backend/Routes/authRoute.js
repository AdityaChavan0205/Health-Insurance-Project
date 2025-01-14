const express = require("express");

const router = express.Router();

const {userSignUp,verifyOtp, userLogin, adminLogin} = require('../Controllers/userController');
const {authMiddleware, isUser, isAdmin} = require('../Middlewares/authMiddleware')

router.post("/signup/user", userSignUp);
router.post("/signup/user/verify-otp", verifyOtp);
router.post("/login/user", userLogin);
router.post("/login/admin", adminLogin);


// Testing protected route
router.get('/test', authMiddleware, (req,res) => {
    return res.status(201).json({
        success:true,
        msg:"Welcome to the testing protected route."
    });
});

// Protected route for Student
router.get('/user', authMiddleware, isUser, (req,res) => {
    return res.status(200).json({
        success:true,
        msg:"Welcome to the User protected route."
    });
})

// Protected route for Admin
router.get('/admin', authMiddleware, isAdmin, (req,res) => {
    return res.status(201).json({
        success:true,
        msg:"Welcome to the admin protected route."
    });
});


module.exports = router;


