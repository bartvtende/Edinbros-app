var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');
var router = express.Router();

var auth = require('./auth');

var settings = require('../config/settings');

var User = require('../models/users');

/**
 * Login with a JWT (email)
 */
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            return res.status(401).send({ message: { email: 'Incorrect email' } });
        }

        bcrypt.compare(req.body.password, user.toObject().password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: { password: 'Incorrect password' } });
            }

            user = user.toObject();
            delete user.password;

            var payload = {
                exp: moment().add(180, 'minutes').unix(),
                iat: moment().unix(),
                sub: user._id
            };

            var token =  jwt.encode(payload, settings.tokenSecret);
            res.send({ token: token, user: user });
        });
    });
});

/**
 * Signup for Edinbros with email
 */
router.post('/signup', function(req, res) {
    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            return res.status(409).send({message: 'Email is already taken.'});
        }

        var user = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            points: 0,
            skillset: []
        });

        if (req.body.image != null)
            user.image = req.body.image;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;

                user.save(function () {
                    var payload = {
                        exp: moment().add(180, 'minutes').unix(),
                        iat: moment().unix(),
                        sub: user._id
                    };

                    var token = jwt.encode(payload, settings.tokenSecret);
                    res.send({token: token, user: user});
                });
            });
        });
    });
});

/**
 * Gets the profile of yourself
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    var user = req.user.toObject();
    user.password = '';

    return res.json({
        error: '',
        result: user
    });
});

/**
 * Gets the profile of another user
 */
router.get('/:userId', auth.isAuthenticated, function(req, res) {
    var id = req.params.userId;

    User.findOne({ _id: id }, function(err, user) {
        var user = user.toObject();

        user.password = '';

        return res.json({
            error: '',
            result: user
        });
    })
});

/**
 * Adds a skill to your profile
 */
router.post('/skillset', auth.isAuthenticated, function(req, res) {
    var name = req.body.name;
    var user = req.user.toObject();
    var exists = false;

    if (name == null || name == '') {
        return res.json({
            error: 'You didn\'t provide a name!',
            result: ''
        });
    }

    var skillset = user.skillset;

    if (skillset == null || skillset.length == 0 || skillset == '[]') {
        console.log('Empty!');
    } else {
        for (var i = 0; i < skillset.length; i++) {
            if (skillset[i] == name) {
                exists = true;
            }
        }
    }

    if (exists) {
        return res.json({
            error: 'You already have added this skill!',
            result: ''
        });
    } else {
        User.findByIdAndUpdate(req.user._id, {$push: {"skillset": name}}, function(err, user) {
            return res.json({
                error: '',
                result: 'Skill has been added!'
            });
        })
    }

});

router.delete('/skillset', auth.isAuthenticated, function(req, res) {
    var name = req.body.name;

    if (name == null || name == '') {
        return res.json({
            error: 'You didn\'t provide a name!',
            result: ''
        });
    }
});

module.exports = router;