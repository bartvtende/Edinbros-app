var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var chatSchema = new Schema({

}, { versionKey: false, strict: false });

chatSchema.plugin(timestamps);

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;