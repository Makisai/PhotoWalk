module.exports = app => {
    const photowalk = require("../controllers/photowalk.controller.js");

    var router = require("express").Router();

    router.get("/", photowalk.findAll);

    router.get("/:id", photowalk.findOne);

    app.use('/api/photowalks', router);
}