const Sequelize = require('sequelize');

module.exports = class Wording extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      wording_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true

      },
      user_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bookname: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      page: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Wording',
      tableName: 'wording',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  }
};
