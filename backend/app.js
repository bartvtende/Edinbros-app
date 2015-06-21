var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var fs = require('fs');

// Config files
var settings = require('./config/settings');

// MongoDB connection with Mongoose
mongoose.connect('mongodb://' + settings.mongoHost + '/' + settings.mongoDatabase);

var app = express();

var io = require('socket.io')(1338);

app.set('port', settings.appPort || 3000);

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

var Chat = require('./models/chat');

// Socket.io: chat message
io.on('connection', function(socket){
    socket.on('join', function(msg) {
        socket.join(msg);
    });

    socket.on('chat message', function(msg){
        try {
            var json = JSON.parse(msg);
        } catch (e) {
            return false;
        }

        if (json.requestId == null)
            return false;

        var messageInput = {
            requestId: json.projectId,
            senderId: json.userId,
            message: json.message
        };

        var chat = new Chat(messageInput);

        chat.save(function(err, message) {
            if (err)
                return false;

            io.to('r:' + json.requestId).emit('receive', message);
        });

    });
});

// Include controllers
var request = require('./controllers/request');
var user = require('./controllers/users');
var leaderboard = require('./controllers/leaderboard');
var chat = require('./controllers/chat');

// Routes
app.use('/api/request', request);
app.use('/api/user', user);
app.use('/api/leaderboard', leaderboard);
app.use('/api/chat', chat);


// Run the express server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;