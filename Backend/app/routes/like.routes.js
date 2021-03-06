const passport = require('passport');

module.exports = app => {
    const likes = require("../controllers/like.controller");
    var router = require("express").Router();

    router.post("/:photoId", passport.authenticate('bearer', { session: false }), likes.create);

    router.get("/:photoId", passport.authenticate('bearer', { session: false }), likes.findAllCountOnePhoto);

    router.delete("/:photoId", passport.authenticate('bearer', { session: false }), likes.delete)

    app.use('/api/likes', router);
}