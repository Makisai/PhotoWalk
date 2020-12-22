module.exports = app => {
    const friendship = require("../controllers/friendship.controller");

    var router = require("express").Router();

    router.post("/", friendship.create);

    router.get("/:id", friendship.findAllOneUser);

    router.put("/:id", friendship.acceptFriendship)

    app.use('/api/friendships', router);
}