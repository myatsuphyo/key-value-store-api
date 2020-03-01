const mongoose = require("mongoose");

const option = {
    useNewUrlParser: true
};

// mongoose.connect(
//     process.env.MONGODB_URL || "mongodb://localhost/intense-mesa-80609",option
// );


mongoose.connect(
    "mongodb://admin:admin123@ds259528.mlab.com:59528/heroku_rrdf7rs3", option
);

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//     console.log("MongoDB connected!");
// });
