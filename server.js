const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config();
require('./app/routes')(app, {});
app.listen(port, () => {
    console.log(process.env.MONGODB_URI);
    console.log('We are live on ' + process.env.PORT);
});

