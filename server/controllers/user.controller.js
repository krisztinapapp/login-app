const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.signup = async (req,res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            vm: {
                vmName: req.body.vmName,
                vmId: req.body.vmId
            },
            password: req.body.password
        })
        console.log(user);
        return res.status(200).json({ ok: true });
    } catch(err) {
        console.log('user.controller: Error signing up');
        console.log(err);
        return res.status(422).json({ ok: false, error: 'Duplicate username' });
    }
    
};

module.exports.authenticate = async (req,res) => {
    const password = req.body.password;

    const user = await User.findOne({
        username: req.body.username,
    });

    if(!user) {
        console.log('User is not registered.');
        return res.status(404).json({ ok: false, error: 'Not registered' });
    } else if(!user.verifyPassword(password)) { // verifyPassword defined in user.model.js
        console.log('Wrong password.');
        return res.status(401).json({ ok: false, error: 'Wrong password' });
    } else {
        console.log('Verified login data.');
        const token = user.generateJwt(); // generateJwt defined in user.model.js
        return res.status(200).json({ ok: true, token: token });
    }
};

module.exports.getUserInfo = async (req,res,next) => {
    User.findOne({
        _id: req._id
    }, (err,user) => {
        if (!err) {
            res.send(user);
        } else {
            return next(err);
        }
    });
};