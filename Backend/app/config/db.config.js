//DATEN HIER MÜSSEN DYNAMISCH ANGEPASST WERDEN
//Datenbank Verbindungs Parameter
module.exports = {
    HOST: "localhost",
    USER: "michelleweck",
    PASSWORD: "password",
    DB: "ProbeAPI_DB",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};