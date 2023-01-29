// Description: This file contains the routes for user registration and login.
const express = require('express');
const User = require('../models/user');
const {login, register} = require('../controllers/auth');
const router = express.Router();

// route for user registration using phone number and password 
// and save user to database
// check if user already exists
// if user exists, return error
// if user does not exist, create user and return user
router.post('/signup', register);

// route for user login using phone number and password
// check if user exists
// if user does not exist, return error
// if user exists, check if password is correct
// if password is incorrect, return error
// if password is correct, generate token and return user
router.post('/login', login);

module.exports=router