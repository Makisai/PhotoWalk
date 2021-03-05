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
db.likes = require("./like.model.js")(sequelize, Sequelize);
db.waypoints = require("./waypoints.model")(sequelize,Sequelize);

//Hinzufügen von foreign Keys zu Modellen

//Photowalks hat viele Challenges (One-To-Many)
db.photowalks.hasMany(db.challenges, {as: "challenges"});
db.challenges.belongsTo(db.photowalks, {
    foreignKey: "photowalkId",
    as: "photowalk"
});

//Zu Challenges gehören viele Photos (One-To-Many)
db.challenges.hasMany(db.photos, {as: "photos"},{onDelete: "CASCADE"});
db.photos.belongsTo(db.challenges, {
    foreignKey: "challengeId",
    as: "challenge"
});

//Ein User hat viele Photos (One-To-Many)
db.users.hasMany(db.photos, {as: "user_photos"});
db.photos.belongsTo(db.users, {
    foreignKey: {name:"userId", allowNull: false},
    as: "user"
});

//Ein Photo wird von vielen Usern geliked/Ein User vergibt viele Likes an Photos (Many-To-Many)
db.users.belongsToMany(db.photos, {through: db.likes}, {onDelete: "CASCADE"});
db.photos.belongsToMany(db.users, {through: db.likes}, {onDelete: "CASCADE"});

//Ein User hat viele Freunde/Ein User ist mit vielen Usern befreundet (Many-To-Many)
db.users.belongsToMany(db.users, {
    through: db.friendships,
    as: "friends"
}, { onDelete: "CASCADE"});

//Ein Photowalk hat mehrer Waypoints / Ein Waypoint gehört zu einem Photowalk (One-To-Many)
db.photowalks.hasMany(db.waypoints);
db.waypoints.belongsTo(db.photowalks);

module.exports = db;