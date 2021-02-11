const passport = require('passport');

module.exports = app => {
    const friendship = require("../controllers/friendship.controller");
    var router = require("express").Router();

    router.post("/:username", passport.authenticate('bearer', { session: false }), friendship.create);

    router.put("/:username", passport.authenticate('bearer', { session: false }), friendship.acceptFriendship)

    router.delete("/:username", passport.authenticate('bearer', { session: false }), friendship.deleteFriendship)

    app.use('/api/friendships', router);
}