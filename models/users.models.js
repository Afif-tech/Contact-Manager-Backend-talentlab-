const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"]
        },
        email: {
            type: String,
            required: [true, "Please enter user's email"],
            unique: [true, "Email already taken"]
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;