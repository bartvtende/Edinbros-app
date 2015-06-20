var express = require('express');
var router = express.Router();

var auth = require('./auth');

var Request = require('../models/request');

/**
 * Get all the requests
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    Request.find({}, function(err, requests) {
        return res.json({
            error: '',
            result: requests
        });
    });
});

/**
 * Get the request details
 */
router.get('/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    Request.findOne({ _id: id }, function(err, request) {
        return res.json({
            error: '',
            result: request
        });
    });
});

/**
 * Create a request
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    // Set the logged in user as creator (requester)
    req.body.requester = req.user._id;
    req.body.done = false;
    req.body.signups = [];

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

/**
 * Update a request
 */
router.put('/', auth.isAuthenticated, function(req, res) {
    var id = req.body._id;

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

/**
 * Delete a request
 */
router.delete('/', auth.isAuthenticated, function(req, res) {
    var id = req.body._id;

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

/**
 * Join a request
 */
router.get('/:id/join', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    Request.findOne({ _id: id }, function(err, task) {
        if (task == null || task == undefined || task == '') {
            return res.json({
                error: 'Request doesn\'t exist',
                result: ''
            });
        }

        var signups = task.toObject().signups;

        if (signups == null || signups == undefined || signups.length == 0) {
            signups = req.user._id;
        } else {
            var exists = false;
            for (var i = 0; i < signups.length; i++) {
                if (signups[i] == req.user._id)
                    exists = true;
            }

            if (exists) {
                return res.json({
                    error: 'You already joined!',
                    result: ''
                });
            }
        }

        Request.findByIdAndUpdate(id, {$push: {"signups": req.user._id}}, function(err, request) {
            return res.json({
                error: '',
                result: 'Joined!'
            });
        })
    })
});

module.exports = router;