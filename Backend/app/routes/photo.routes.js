module.exports = app => {
    const photo = require("../controllers/photo.controller.js");

    var router = require("express").Router();

    router.post("/", photo.create);

    router.get("/", photo.findAll);

    router.get("/:id", photo.findOne);

    router.delete("/:id", photo.delete)

    app.use('/api/photos', router);
}