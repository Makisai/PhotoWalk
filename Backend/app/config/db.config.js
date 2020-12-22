//DATEN HIER MÜSSEN DYNAMISCH ANGEPASST WERDEN
//Datenbank Verbindungs Parameter
module.exports = {
    HOST: "localhost",
    USER: "julia",
    PASSWORD: "julia",
    DB: "photowalk",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};