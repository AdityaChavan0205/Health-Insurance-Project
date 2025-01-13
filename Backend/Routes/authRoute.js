const express = require("express");

const router = express.Router();
const {signUp,login} = require('../Controllers/userController');
// const {initializeAdmin} = require("../Controllers/adminController")
const {authMiddleware, isUser, isAdmin} = require('../Middlewares/authMiddleware')

router.post("/signup/user", signUp);
router.post("/login/user", login);
router.post("/signup/admin", signUp);
router.post("/login/admin", login);

// router.post("/initialize/admin", initializeAdmin);
// Testing protected route
router.get('/test', authMiddleware, (req,res) => {
return res.status(201).json({
success:true,
msg:"Welcome to the testing protected route."
})
})

// Protected route for Student
router.get('/user', authMiddleware, isUser, (req,res) => {
return res.status(200).json({
success:true,
msg:"Welcome to the User protected route."
})
})

// Protected route for Admin
router.get('/admin', authMiddleware, isAdmin, (req,res) => {
return res.status(201).json({
success:true,
msg:"Welcome to the admin protected route."
})
})


module.exports = router;


