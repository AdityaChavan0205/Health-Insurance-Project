const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      maxLength: 500,
    },

    role: {
      type: String,
      enum: ["Admin", "User", "Visitor"],
      required: true,
      default: "User", // Default to 'User' if not specified
    },

    phoneNo: {
      type: String,
      maxLength: 20,
    },

    address: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    
    otp: {
      type:String,
      require:true
    },

    otpExpiry:{
      type:Date
    },

    isVerified: { 
      type: Boolean, 
      default: false 
    }, // Ensure this is included
}, 
    
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }

);

module.exports = mongoose.model("User", userSchema);
