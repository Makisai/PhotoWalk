const passport = require('passport');

module.exports = app => {
    const friendship = require("../controllers/friendship.controller");
    var router = require("express").Router();

    router.post("/", passport.authenticate('bearer', { session: false }), friendship.create);

    router.get("/:id", passport.authenticate('bearer', { session: false }), friendship.findAllOneUser);

    router.put("/:id", passport.authenticate('bearer', { session: false }), friendship.acceptFriendship)

    router.delete("/:id", passport.authenticate('bearer', { session: false }), friendship.deleteFriendship)

    app.use('/api/friendships', router);
}