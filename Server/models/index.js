const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
});

// Testing connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.note = require('../models/note.model.js')(sequelize, Sequelize);
db.card = require('../models/card.model.js')(sequelize, Sequelize);
db.clients = require('../models/clients.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.user.hasMany(db.note, { foreignKey: { allowNull: false }})
db.note.belongsTo(db.user, { foreignKey: 'userId'})

db.user.hasMany(db.card, { foreignKey: { allowNull: false }})
db.card.belongsTo(db.user, { foreignKey: 'userId'})

db.ROLES = ['user', 'admin', 'moderator'];
module.exports = db;
