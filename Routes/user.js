const Router = require('express').Router();
const User = require('../Models/user');
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');
const generateToken = require('../Utils/authorize');
//const authenticateUser = require('../Middleware/authHandler')


//@desc
//route
//@access

// @desc   Register user
// route   POST /api/users/register
// @access Public
//throw new Error('Something went wrong');


Router.post('/users/register', asyncHandler(async (req, res) => {
    const {
        user_name,
        user_password,
        user_email
    } = req.body;
    const UserExists = await User.findOne({
        user_email
    })
    if (UserExists) {
        //Error message 'the user already exist please login
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        user_name,
        user_email,
        user_password
    })

    if (user) {

        generateToken(res, user._id);
        //redirect to the page upon success
        res.redirect('/login')
        /*res.status(201).json({
            _id: user._id,
            name: user.user_name,
            email: user.user_email,
            role: user.user_role,
        })*/
    } else {
        //error page and redirerect with the message the password or the email is missing
        res.status(400);
        throw new Error('Invalid user')
    }


}))

//@desc   Login user
//route   POST api/users/login
//@access PUBLIC


Router.post('/users/login', asyncHandler(async (req, res) => {
    const {
        user_email,
        user_password
    } = req.body;
    const user = await User.findOne({
        user_email
    });

    if (user && (await user.matchPasswords(user_password))) {

        generateToken(res, user._id);
        res.redirect('/success')
       /* res.status(200).json({
            _id:user._id,
            name:user.user_name
        })*/
    } else {
        res.status(401);
        throw new Error('Invalid user credentials ')
    }
}))


//@desc   Logout user
//route   POST api/users/logout
//@access Private


Router.post('/users/logout', asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }).status(200).json({
        message: "Logout successful"
    })
}))

Router.get('/users/logout', asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }).status(200).redirect('/')
}))






module.exports = Router;