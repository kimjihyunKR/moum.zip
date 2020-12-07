const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Wording, { foreignKey: 'user_id' , sourceKey: 'user_id'});
  }
};
