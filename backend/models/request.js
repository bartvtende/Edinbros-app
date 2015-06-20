var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var requestSchema = new Schema({

}, { versionKey: false, strict: false });

requestSchema.plugin(timestamps);

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;