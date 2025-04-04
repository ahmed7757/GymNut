const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        default: 0,
    },
    height: {
        type: Number,
        default: 0,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    listOfPlans: [
        {
            goals: {
                type: Object,  // You can define the structure of goals here instead of 'Object'
                required: true
            },
            details: {
                type: Object,  // Same as goals, define the structure if needed
                required: true
            }
        }
    ],
    disease: {
        type: String,
        default: "",
    },
    phoneNum: {
        type: String,
        default: "",
    },
    listOfTrackedFoods: [{
        foodId: {
            type: Schema.Types.ObjectId,
            ref: 'food', // Assuming 'food' is your reference model
        },
        quantity: {
            type: Number,
            default: 0,
        },
        details: {
            calories: {
                type: Number, // Use Number instead of float
            },
            protein: {
                type: Number, // Use Number instead of float
            },
            fats: {
                type: Number, // Use Number instead of float
            },
            carbs: {
                type: Number, // Use Number instead of float
            }
        },
        dateTracked: {
            type: Date,
            default: Date.now,
        }
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model("user", userSchema);
