// Description: This file contains the schema for contact form
const mongoose = require("mongoose");

// create a schema for contact form with fullName, email, subject and message
const contactSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// export contactSchema
module.exports = mongoose.model("Contact", contactSchema);
