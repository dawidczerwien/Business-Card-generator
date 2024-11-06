module.exports = (sequelize, Sequelize) => {
  const Clients = sequelize.define('clients', {
    phone: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    topic: {
      type: Sequelize.STRING,
    },
  });
  return Clients;
};
