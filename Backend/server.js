const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
//const session = require("express-session");
const passport = require("passport");
require("./app/config/passport.config")(passport);
//const SessionStore = require('express-session-sequelize')(session.Store);

/*const sequelizeSessionStore = new SessionStore({
    db: db.sequelize
}); */

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
//setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Synchronisieren mit der Datenbank - check ob Tabellen existieren - Erstellt die Tabellen
//force:true dropt alle Tables und
db.sequelize.sync({/*force:true*/}).then(() => {
    console.log("Drop and re-sync db.");
});

//Session use
app.use(cookieParser());
/*
app.use(session({
    secret: 'secret',
    store: sequelizeSessionStore,
    resave:true,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000 * 5
    }
}));
*/

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