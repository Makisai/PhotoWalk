require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const passport = require("passport");
require("./app/config/passport.config")(passport);

const seederRoute1 = require("./app/seeds/route1");
const seederRoute2 = require("./app/seeds/route2");
const seederRoute3 = require("./app/seeds/route3");


const app = express();
app.use(express.static('app/public'));


var corsOptions = {
    origin: process.env.FRONTEND_URL
};
//setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Synchronisieren mit der Datenbank - check ob Tabellen existieren - Erstellt die Tabellen
//force:true dropt alle Tables und
/*db.sequelize.sync({force:true}).then(() => {
    console.log("Drop and re-sync db.");
    seederRoute1.route1();
    seederRoute2.route2();
    seederRoute3.route3();
});*/

//Session use
app.use(cookieParser());

//Passport Initialisierung
app.use(passport.initialize());
app.use(passport.session());

//übergeben der Routen
require("./app/routes/photowalk.routes")(app);
require("./app/routes/challenge.routes")(app);
require("./app/routes/photo.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/friendship.routes")(app);
require("./app/routes/like.routes")(app);

//starten vom Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});