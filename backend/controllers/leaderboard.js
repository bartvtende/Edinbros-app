var express = require('express');
var router = express.Router();

var auth = require('./auth');

var User = require('../models/users');

router.get('/', auth.isAuthenticated, function(req, res) {
    var limit = 10;

    User
        .find({}, { 'password': 0 })
        .sort({'points': 'desc'})
        .limit(limit)
        .exec(function(err, users) {
            return res.json({
                error: '',
                result: users
            })
        });
});

module.exports = router;