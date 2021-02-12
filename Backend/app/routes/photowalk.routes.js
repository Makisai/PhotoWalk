const passport = require('passport');

module.exports = app => {
    const photowalk = require("../controllers/photowalk.controller.js");
    var router = require("express").Router();

    router.get("/", passport.authenticate('bearer', { session: false }), photowalk.findAll);

    router.get("/last", passport.authenticate('bearer', { session: false }), photowalk.findLastPhotowalk);

    router.get("/:id", passport.authenticate('bearer', { session: false }), photowalk.findOne);

    app.use('/api/photowalks', router);
}