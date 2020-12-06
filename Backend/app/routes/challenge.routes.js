module.exports = app => {
    const challenge = require("../controllers/challenge.controller.js");

    var router = require("express").Router();

    router.get("/", challenge.findAll);

    router.get("/:id", challenge.findOne);

    app.use('/api/challenges', router);
}