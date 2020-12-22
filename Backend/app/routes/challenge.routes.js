module.exports = app => {
    const challenge = require("../controllers/challenge.controller.js");

    var router = require("express").Router();

    router.get("/photowalk/:id", challenge.findAllByPhotowalk);

    router.get("/:id", challenge.findOne);

    app.use('/api/challenges', router);
}