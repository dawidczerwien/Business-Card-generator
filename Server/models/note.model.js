module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define('notes', {
        content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
    return Note;
  };
  