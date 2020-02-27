const ObjectModel = require('../models/object.model');

let create = function (req, res) {

    const key = Object.keys(req.body).toString();
    const value = Object.values(req.body).toString();

    var oldValue = findByKey(key, resgit c);

    console.log(oldValue);
    if (!key || !value) {
        res.status(500).send({
            message: err.message || "Unvalid value(s) to create a key-value record."
        });
    } else if (oldValue) {
        // update a new key-value object
        updateAndSaveHistory(oldValue, value);
    } else {
        // create a new key-value object
        // const objectModel = new ObjectModel();
        // objectModel.key = key;
        // objectModel.value = value;
        // objectModel.history.version = 1;
        // objectModel.save();
        // res.send(objectModel);
    }
};

let updateAndSaveHistory = function (oldValue, value) {
    // const objectModel = new ObjectModel();
    // objectModel.key = key;
    // objectModel.value = value;
    // objectModel.save();
    // res.send(objectModel);
    // console.log(oldValue);
    console.log(value);
}

let findAll = function (req, res) {
    ObjectModel.find()
        .then(records => {
            res.send(records);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving records."
            });
        });
};

let findByKey = function (key, res) {
    ObjectModel.findOne({ "key" : key})
        .then(record => {
            console.log(record);
            return record;
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving records."
            });
        });
};

exports.create = create;
exports.findAll = findAll;
exports.findByKey = findByKey;