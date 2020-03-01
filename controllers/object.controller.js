const ObjectModel = require('../models/object.model');

let create = async function (req, res) {

    const key = Object.keys(req.body).toString();
    const value = Object.values(req.body).toString();

    const oldValue = await findByKey(key);
    var currentTimestamp = Math.round(new Date().getTime() / 1000); // to have consistant timestamp in both parent obj and history arr

    if (!key || !value) {
        res.status(500).send({
            message: err.message || "Unvalid value(s) to create a key-value record."
        });
    } else if (oldValue) {
        // update a new key-value object
        await updateAndSaveHistory(oldValue, value, currentTimestamp);
    } else {
        // create a new key-value object
        
        const objectModel = new ObjectModel();
        objectModel.key = key;
        objectModel.value = value;
        objectModel.timestamp = currentTimestamp;
        objectModel.history = [
            {
                value: value,
                timestamp: currentTimestamp
            }
        ];
        objectModel.save();
        res.send(objectModel);
    }
};

let updateAndSaveHistory = function (oldValue, value, currentTimestamp) { 
    return new Promise(resolve => {
        ObjectModel.findById(oldValue._id)
        .then(record => {
            record.value = value;
            record.timestamp = currentTimestamp;
            record.history.push({
                value: value,
                timestamp: currentTimestamp
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
            res.send({ value: result.value });
        } else {
            // finding by checking with every timestamp in history array
            const resultAfterCheckingTimestamp = await findByTimestamp( req.query.timestamp, result);
            res.send({ "value": resultAfterCheckingTimestamp });
        }
    } else {
        res.send({"value": result.value});
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
        var firstIndex = parseInt(0);
        var lastIndex = parseInt(arr.length - 1);
        // find timestamp closest to given timestamp if there is more than one index between first and last
        while (lastIndex - firstIndex >= 2) {
            var indexOfClosestTimestamp = parseInt((firstIndex + lastIndex) / 2);
            if (timestamp >= result.history[indexOfClosestTimestamp].timestamp) {
                // to go to right (higher)
                firstIndex = indexOfClosestTimestamp;
            } else {
                // to go to left (lower)
                lastIndex = indexOfClosestTimestamp;
            }
        }  
        
        // find value by comparing given timestamp and closest timestamp
        if (timestamp == result.history[indexOfClosestTimestamp].timestamp) {
            resolve(result.history[indexOfClosestTimestamp].value);
        } else {
            if (timestamp > result.history[indexOfClosestTimestamp].timestamp) {
                resolve(result.history[indexOfClosestTimestamp + 1].value);
            } else {
                resolve(result.history[indexOfClosestTimestamp - 1].value);
            }
        }
    });
}

exports.create = create;
exports.findAll = findAll;
exports.findByKeyParams = findByKeyParams;