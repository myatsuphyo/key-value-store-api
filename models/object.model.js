var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ObjectSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
        history: {
            version: {type: Number, default: 1},
            value: { type: String},
            timestamp: { type: Date, default: Date.now }
    }
});

ObjectSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("Object", ObjectSchema); // model name, schema name,  collection name
