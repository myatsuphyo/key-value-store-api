module.exports = function (app) {
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

    // home route
    app.get("/", function (req, res) {
        res.send(
            "Please, check READEME here. https://github.com/myatsuphyo/key-value-store-api.git"
        );
    });
};