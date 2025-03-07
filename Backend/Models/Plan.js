const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plan name is required"],
        unique: true
    },
    description: {
        type: String 
    },
    monthlyPremium: { 
        type: Number, 
        required: true 
    },
    yearlyPremium: { 
        type: Number, 
        required: true 
    }, // (monthly * 12)
    
    duration: {
        type: Number,
        required: [true, "Duration is required"]
    },
    benefits: [{ type: String }],

    keyFeatures: {
        type: [String], 
        validate: {
            validator: function (features) {
                return features.length === 7; // Ensuring exactly 7 key features
            },
            message: "Each plan must have exactly 7 key features."
        },
        required: [true, "Key features are required"]
    },

    image: {
        type: String, // Store image URL (Cloudinary, AWS S3, Firebase, etc.)
        required: [true, "Plan image is required"]
    },

    createdAt: { 
        type: Date,
        default: Date.now 
    },
});  

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;