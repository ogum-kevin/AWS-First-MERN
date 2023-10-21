const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/user');

/*
{
    errorMessage:
    errorCode:
    errorPage:
    errorLink:
}

*/

const authenticateUser = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;


    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.user = await User.findById(decoded.userID).select('-user_password')
            next()

        } catch (error) {
            res.status(401)
            //Not authorized invalid token
            throw new Error('Not authorized,invalid token!Try to signup and try again!')
        }
    } else {
        res.status(401);
        //Not authorized no token
        throw new Error('Not authorized,no token!! Try login and try again!')
    }
})


module.exports = authenticateUser;