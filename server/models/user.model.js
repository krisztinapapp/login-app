const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../config/config');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required.'
        },
        password: {
            type: String,
            required: 'Password is required.'
        },
        saltSecret: String
    }
);

// pre-event: encrypt password before saving data
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(this.password,salt,(err,hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
});

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign( { _id: this._id },
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
};

// register schema inside mongoose
const User = mongoose.model('User', userSchema);
module.exports = User;

mongoose.model('User', userSchema);