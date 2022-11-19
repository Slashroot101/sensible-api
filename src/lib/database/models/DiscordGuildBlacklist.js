const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordGuildBlacklist extends Model {
  static associate(models) {
    models.DiscordGuildBlacklist.belongsTo(models.DiscordGuild, {foreignKey: {name: 'discordGuildId'}});
  }
}

DiscordGuildBlacklist.init(
  {
    word: {
      type: DataTypes.STRING,
    },
  }, 
  {
    paranoid: true,
    sequelize: db,
    modelName: 'DiscordGuildBlacklist',
  }
);

module.exports = DiscordGuildBlacklist;