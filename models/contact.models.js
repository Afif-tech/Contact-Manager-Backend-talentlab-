const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please enter contact name"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please enter contact email"],
            validate: [validator.isEmail, "Please enter a valid email"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Please enter contact number"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = Contact;