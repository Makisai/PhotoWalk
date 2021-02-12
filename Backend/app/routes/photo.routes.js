const passport = require('passport');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./app/public/uploads/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
});

const fileFilter = (req,file,cb)=> {
    if(file.mimetype === 'image/jpeg'|| file.mimetype ==='image/png' || file.mimetype ==='image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*15
    },
    fileFilter: fileFilter
});

module.exports = app => {

    const photo = require("../controllers/photo.controller.js");
    var router = require("express").Router();

    router.post("/", passport.authenticate('bearer', { session: false }), upload.single('photo_link'),photo.create);

    router.get("/user", passport.authenticate('bearer', { session: false }), photo.findAllByUserId);

    router.get("/photowalk/:id", passport.authenticate('bearer', { session: false }), photo.findAllByPhotowalkId);

    router.get("/:id", passport.authenticate('bearer', { session: false }), photo.findOne);

    router.delete("/:id", passport.authenticate('bearer', { session: false }), photo.delete);

    app.use('/api/photos', router);
}