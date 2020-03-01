const ObjectModel = require('../models/object.model');

let create = async function (req, res) {

    const key = Object.keys(req.body).toString();
    const value = Object.values(req.body).toString();

    const oldValue = await findByKey(key);

    if (!key || !value) {
        res.status(500).send({
            message: err.message || "Unvalid value(s) to create a key-value record."
        });
    } else if (oldValue) {
        // update a new key-value object
        await updateAndSaveHistory(oldValue, value);
    } else {
        // create a new key-value object
        const objectModel = new ObjectModel();
        objectModel.key = key;
        objectModel.value = value;
        objectModel.history = [
            {
                "value": value,
                "timestamp": Math.round(new Date().getTime() / 1000)
            }
        ];
        objectModel.save();
        res.send(objectModel);
    }
};

let updateAndSaveHistory = function (oldValue, value) { 
    return new Promise(resolve => {
        ObjectModel.findById(oldValue._id)
        .then(record => {
            record.value = value;
            record.history.push({
                value: value,
                timestamp: Math.round(new Date().getTime() / 1000)
            });
            record.save();
        })
        .catch(err => {
            console.log(err);
        });
        resolve('success update');
    });
    
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

// this function gets key from req.params
let findByKeyParams = async function (req, res) {
    const result = await findByKey(req.params.key);
    if (req.query.timestamp) {
        if (req.query.timestamp < result.history[0].timestamp) {
            // before setting value 
            res.send('No value for this key was set at the given timestamp.');
        } else if (req.query.timestamp > result.timestamp) {
            // after setting last value
            res.send(result);
        } else {
            // finding by checking with every timestamp in history array
            const resultAfterCheckingTimestamp = await findByTimestamp( req.query.timestamp, result);
            res.send(resultAfterCheckingTimestamp);
        }
    } else {
        res.send(result);
    }
}

let findByKey = function (key) {
    return new Promise(resolve => {
        ObjectModel.findOne({ "key": key })
            .then(record => {
                resolve(record);
            })
            .catch(err => {
                console.log(err);
            });
    });
};

let findByTimestamp = function (timestamp, result) {
    return new Promise(resolve => {
        var arr = result.history;
    });
}

exports.create = create;
exports.findAll = findAll;
exports.findByKeyParams = findByKeyParams;