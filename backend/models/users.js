var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var userSchema = new Schema({

}, { versionKey: false, strict: false });

userSchema.plugin(timestamps);

var User = mongoose.model('User', userSchema);

module.exports = User;