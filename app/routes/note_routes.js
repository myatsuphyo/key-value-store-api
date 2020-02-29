module.exports = function (app, db) {
    const ObjectController = require('../../controllers/object.controller');

    app.post('/object', (req, res) => {
        ObjectController.create(req, res);
    });

    app.get("/object", (req, res) => {
        ObjectController.findAll(req, res);
    });

    app.get("/object/:key", (req, res) => {
        ObjectController.findByKeyParams(req, res);
    });
};