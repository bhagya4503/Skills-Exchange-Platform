const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        skillsHave: {
            type: [String],
            default: [],
        },

        skillsWant: {
            type: [String],
            default: [],
        },

        bio: {
            type: String,
            default: "",
        },

        availability: {
            type: String,
            enum: ["Weekend", "Weekdays", "Morning", "Evening"],
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);