module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define('cards', {
    username: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    vcardAddress: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
    },
  });
  return Card;
};
