 // Description: This file contains the routes for contact form
const express = require('express');
const User = require('../models/user');
const {postContact, getContacts}= require('../controllers/contact');
const router = express.Router();

// route for contact form
router.post('/contact', postContact);
router.get('/contact', getContacts);

module.exports=router
