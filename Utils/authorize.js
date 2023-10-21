const jwt = require('jsonwebtoken');

const generateToken = (res, userID) => {
    const token = jwt.sign({
        userID
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'DEVELOPMENT',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    })
}

module.exports = generateToken;