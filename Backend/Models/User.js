const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
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

    otpExpiry: {
      type:Date,
      // default: Date.now, 
      // expires: 300
    }

  },

  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }

);

module.exports = mongoose.model("User", userSchema);

















// {
//   "email": "chavanaditya0205@gmail.com",
//   "password": "Aditya@0205"
// }




// {
// 	"name": "Mayank Sandikar",
//     "email": "mayanksandikar191098@gmail.com",
//     "password": "mayank@123",
//     "role": "User",
//     "phoneNo": "7899635698"
// }


// {
//   "email": "mayanksandikar191098@gmail.com",
//    "password": "mayank@123"
// }
