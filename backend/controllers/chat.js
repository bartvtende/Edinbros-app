var express = require('express');
var router = express.Router();

var auth = require('./auth');

var Chat = require('../models/chat');

router.get('/:requestId', auth.isAuthenticated, function(req, res) {
    var requestId = req.params.requestId;

    if (requestId == null || requestId == '') {
        return res.json({
            error: 'Request doesn\'t exist',
            result: ''
        })
    }

    Chat
        .find({ requestId: requestId})
        .sort({ createdAt: 'asc' })
        .limit(100)
        .exec(function(err, messages) {
            if (err) {
                return res.json({
                    error: err,
                    result: ''
                });
            } else {
                return res.json({
                    error: '',
                    result: messages
                });
            }
        })
});

module.exports = router;