/*
@description
The user needs an email and a name //validate the email and the name
*/
const mongoose = require('mongoose');
const crypto = require('crypto')


const user_Schema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
    }
    
}, {
    timestamps: true
})
user_Schema.pre('save', async function () {
    if (!this.isModified('user_password')) {
        next()
    }
    password = hashPasswords(this.user_password)
    this.user_password = password;
})

user_Schema.methods.matchPasswords = async function (password) {
    if (this.user_password === hashPasswords(password)) {
        return true;
    } else {
        return false;
    }
}




module.exports = mongoose.model("User", user_Schema)
/******* Hashing of passwords *******/
/*
For security,passwords are hashed before theye are stored in the database.Therefore should the database be compromised the 
the individual user accounts are not compromised too.Inorder to confirm the password during login,the given password is
hased and the hash comapred with the hash of the password stored in the database
*/
const hashPasswords = password => {
    return crypto.createHash('sha256').update(password).digest('hex')
}