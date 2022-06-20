// Description: This file contains the logic/ controllers for registering and logging in users.
const User = require('../models/user');

// route for user registration using phone number and password 
// and save user to database
// check if user already exists
// if user exists, return error
// and
// if user does not exist, create user and return user
const register = async (req, res) => {
    try {
        const { phoneNumber, password, fullName, role, email, location } = req.body;
        // check if user already exists
        const userBYPhoneNumber = await User.findOne({
            phoneNumber
        });
        const userBYEmail = await User.findOne({
            email
        });
        // if user exists, return error
        if (userBYPhoneNumber || userBYEmail) {
            return res.status(400).send({error: 'User already exists.'});
        }
        // if user does not exist, create user and return user
        const newUser = new User({
            phoneNumber,
            password,
            fullName,
            role,
            email,
            location
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (e) {
        res.status(400).send({error: e.message });
    }
};

// route for user login using phone number and password
// check if user exists
// if user does not exist, return error
// if user exists, check if password is correct
// if password is incorrect, return error
// if password is correct, generate token and return user
const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        // check if user exists
        const user = await User.findOne({
                phoneNumber
            });
        // if user does not exist, return error
        if (!user) {
            return res.status(400).send({error: 'User not found' });
        }
        // if user exists, check if password is correct
        const isPasswordMatch = await user.comparePassword(password);
        // if password is incorrect, return error
        if (!isPasswordMatch) {
            return res.status(400).send({error: 'password not correct' });
        }
        // if password is correct, generate token and return user
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({error: 'Invalid login credentials.' });
    }
}
module.exports = { register, login };