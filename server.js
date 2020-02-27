const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config();
require('./app/routes')(app, {});

// DB connection 
require('./db.js');

app.listen(port, () => {
    console.log('We are live on ' + process.env.PORT);
});

