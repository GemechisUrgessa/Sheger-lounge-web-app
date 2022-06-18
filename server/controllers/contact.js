// Description: controller for contact form
const Contact = require('../models/contact');
// controller for contact form
// which will save the contact form data in database
// and send email to admin
const postContact = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        // create new contact form
        const newContact = new Contact({
            fullName,
            email,
            subject,
            message,
        });
        // save contact form
        await newContact.save();
        res.status(201).send(newContact);
    } catch (e) {
        res.status(400).send({error: e.message });
    }
};

// controller for fetching all contact form data
const getContacts = async (req, res) => {
    try {
        // find all contact form data
        const contacts = await Contact.find({});
        res.status(200).send(contacts);
    } catch (e) {
        res.status(400).send({error: e.message });
    }
};


// export contact controller
module.exports = {postContact, getContacts};

