const passport = require('passport');

module.exports = app => {
    const photo = require("../controllers/photo.controller.js");
    var router = require("express").Router();

    router.post("/", passport.authenticate('bearer', { session: false }), photo.create);

    router.get("/user/:id", passport.authenticate('bearer', { session: false }), photo.findAllByUserId);

    router.get("/:id", passport.authenticate('bearer', { session: false }), photo.findOne);

    router.delete("/:id", passport.authenticate('bearer', { session: false }), photo.delete)

    app.use('/api/photos', router);
}