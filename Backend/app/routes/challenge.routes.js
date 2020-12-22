const passport = require('passport');

module.exports = app => {
    const challenge = require("../controllers/challenge.controller.js");
    var router = require("express").Router();

    router.get("/photowalk/:id", passport.authenticate('bearer', { session: false }), challenge.findAllByPhotowalk);

    router.get("/:id", passport.authenticate('bearer', { session: false }), challenge.findOne);

    app.use('/api/challenges', router);
}