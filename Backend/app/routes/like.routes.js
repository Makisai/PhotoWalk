module.exports = app => {
    const likes = require("../controllers/like.controller");

    var router = require("express").Router();

    router.post("/", likes.create);

    router.get("/:photoId", likes.findAllCountOnePhoto);

    router.delete("/:userId/:photoId", likes.delete)

    app.use('/api/likes', router);
}