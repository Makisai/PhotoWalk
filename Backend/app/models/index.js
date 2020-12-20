//laden der config datei
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models werden in der Datenbank erstellt
db.photowalks = require("./photowalk.model.js")(sequelize, Sequelize);
db.challenges = require("./challenge.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.friendships = require("./friendship.model.js")(sequelize, Sequelize);

//Hinzufügen von foreign Keys zu Modellen
db.photowalks.hasMany(db.challenges, {as: "challenges"});
db.challenges.belongsTo(db.photowalks, {
    foreignKey: "photowalkId",
    as: "photowalk"
});

db.challenges.hasMany(db.photos, {as: "photos"});
db.photos.belongsTo(db.challenges, {
    foreignKey: "challengeId",
    as: "challenge"
});

db.users.hasMany(db.photos, {as: "user_photos"});
db.photos.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
});

db.users.belongsToMany(db.photos, {through: 'Likes'});
db.photos.belongsToMany(db.users, {through: 'Likes'});

db.friendships.belongsTo(db.users, {
    foreignKey: "user1_id",
    as: "user1"
});
db.friendships.belongsTo(db.users, {
    foreignKey: "user2_id",
    as: "user2"
})


module.exports = db;