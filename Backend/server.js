const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const session = require("express-session");
const passport = require("passport");
require("./app/config/passport.config")(passport);

const app = express();

//Passport Initialisierung
app.use(passport.initialize());
app.use(passport.session());

var corsOptions = {
    origin: "http://localhost:8081"
};
//setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Synchronisieren mit der Datenbank - check ob Tabellen existieren - Erstellt die Tabellen
db.sequelize.sync(/*{force:true}*/).then(() => {
    console.log("Drop and re-sync db.");
});

//Session use
app.use(session({secret: 'secret', resave:true, saveUninitialized:false}))

//übergeben der Routen
require("./app/routes/photowalk.routes")(app);
require("./app/routes/challenge.routes")(app);
require("./app/routes/photo.routes")(app);
require("./app/routes/user.routes")(app);

//starten vom Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});