const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class BlacklistMessage extends Model {
  static associate(models) {
    models.BlacklistMessage.belongsTo(models.Message, {foreignKey: {name: 'messageId'}});
    models.BlacklistMessage.belongsTo(models.DiscordGuildBlacklist, {foreignKey: {name: 'discordGuildBlacklistId'}});
  }
}

BlacklistMessage.init(
  {
    
  },
  {
    paranoid: true,
    sequelize: db,
    modelName: 'BlacklistMessage',
  }
);

module.exports = BlacklistMessage;
