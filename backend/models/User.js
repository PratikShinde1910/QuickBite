const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }],
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);