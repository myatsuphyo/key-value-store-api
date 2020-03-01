var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ObjectSchema = new Schema(
    {
        key: { type: String, required: true },
        value: { type: String, required: true },
        timestamp: { type: Number, default: Math.round(new Date().getTime() / 1000) },
        history: { type: Array }
});

ObjectSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    // delete obj.history;
    return obj;
};

module.exports = mongoose.model("Object", ObjectSchema); // model name, schema name,  collection name
