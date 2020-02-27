var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Object", ObjectSchema); // model name, schema name,  collection name
