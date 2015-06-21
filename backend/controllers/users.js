var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var moment = require('moment');
var router = express.Router();

var auth = require('./auth');

var settings = require('../config/settings');

var User = require('../models/users');

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

router.post('/signup', function(req, res) {
    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            return res.status(409).send({message: 'Email is already taken.'});
        }

        var user = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            points: 0
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

router.get('/', auth.isAuthenticated, function(req, res) {
    var user = req.user.toObject();
    user.password = '';
    console.log(user);

    return res.json({
        error: '',
        result: user
    });
});

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

module.exports = router;