const mongoose = require("mongoose");

const option = {
    useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_URL, option);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("MongoDB connected!");
});
