module.exports = app => {
    const photowalk = require("../controllers/photowalk.controller.js");
    const {ensureAuthentication} = require("../config/auth.js");
    var router = require("express").Router();

    router.get("/", ensureAuthentication, photowalk.findAll);

    router.get("/:id", photowalk.findOne);

    app.use('/api/photowalks', router);
}