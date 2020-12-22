const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const fileUpload = reqire("express-fileupload")


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};


//setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// benutzt upload middleware
// es wird ein temporaerer ordner eingestellt
// und, dass Bilder maximl 2mb groß sein duerfen fuer upload
app.use(fileUpload({
    //2MB max file(s) size
    useTempFiles : true,
    tempFileDir : '/Bilder',
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 
    },
}));
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