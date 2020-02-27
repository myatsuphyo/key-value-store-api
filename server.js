const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

require("dotenv").config();
require('./app/routes')(app, {});

app.get("/", function(req, res) {
    res.send("HELLO WORLD");
});

// DB connection 
require('./db.js');

const port = process.env.PORT || 000;
app.listen(port, err => {
    if (err) {
        console.log(`Failed to start server on port ${port}`);
        console.log(err);
    } else {
        console.log(`Server is listening on port ${port}`);
        console.log(`Running in ${app.get("env")}`);
    }
    })
    .on("error", err => {
        console.log("Error starting server");
        console.log(err);
    if (err.errno === "EADDRINUSE") {
        console.log(`The port ${port} is already in use.`);
    }
});
