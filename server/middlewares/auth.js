// Description: This file contains authentication and authorization middlewares
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');


// authentication function with JWT token
const authenticateUser = async (req, res, next) => {
    try {
        // get token from request header
        const token = req.header('Authorization').replace('Bearer ', '');
        // verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        // find user by id and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        // if user not found
        if (!user) {
            throw new Error();
        }
        // add user and token to request
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate to proceed.' });
    }
};

// isAdmin function middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        // get user role
        const role = await Role.findById(req.user.role);
        // if user role is not admin
        if (role.name !== 'admin') {
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(403).send({ error: 'You are not authorized to perform this action.' });

}

};

module.exports = { authenticateUser, isAdmin };