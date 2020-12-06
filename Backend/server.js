const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");


const app = express();

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

//übergeben der Routen
require("./app/routes/photowalk.routes")(app);
require("./app/routes/challenge.routes")(app);
require("./app/routes/photo.routes")(app);

//starten vom Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});