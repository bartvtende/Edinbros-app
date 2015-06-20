var express = require('express');
var router = express.Router();

var auth = require('./auth');

var Request = require('../models/request');

router.get('/', auth.isAuthenticated, function(req, res) {
    Request.find({}, function(err, requests) {
        return res.json({
            error: '',
            result: requests
        });
    });
});

router.get('/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    Request.findOne({ _id: id }, function(err, request) {
        return res.json({
            error: '',
            result: request
        });
    });
});

router.post('/', auth.isAuthenticated, function(req, res) {
    // Set the logged in user as creator (requester)
    req.body.requester = req.user._id;

    var request = new Request(req.body);

    request.save(function(err, request) {
        if(err) {
            return res.json({
                error: err,
                result: ''
            });
        }

        return res.json({
            error: '',
            result: request
        });
    });
});

router.put('/', auth.isAuthenticated, function(req, res) {
    var id = req.body.id;

        Request.findOneAndUpdate({ _id: id }, req.body, function(err, request) {
            var request = request.toObject();

        if (request == null || request == undefined || request == '') {
            return res.json({
                error: 'Request doesn\'t exist',
                result: ''
            });
        }

        if(request.requester == null || request.requester.toString() != req.user._id.toString()) {
            return res.json({
                error: 'This is not your project, sorry!',
                result: ''
            });
        }

        return res.json({
            error: '',
            result: 'Updated!'
        });
    })
});

router.delete('/', auth.isAuthenticated, function(req, res) {
    var id = req.body.id;

    if (id == null || id == '') {
        return res.json({
            error: 'Request doesn\'t exist',
            result: ''
        });
    }

    Request.findOne({ _id: id }, function(err, request) {
        var request = request.toObject();

        if (request == null || request == undefined || request == '' || err) {
            return res.json({
                error: 'Request doesn\'t exist',
                result: ''
            });
        }

        if(request.requester.toString() == req.user._id.toString()) {
            Request.remove({ _id: id }, function() {
                return res.json({
                    error: '',
                    result: 'Request has been removed!'
                });
            });
        } else {
            return res.json({
                error: 'This is not your project, sorry!',
                result: ''
            });
        }
    });
});

module.exports = router;