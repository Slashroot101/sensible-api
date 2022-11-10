const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordGuild extends Model {
	static associate() {}
}

DiscordGuild.init(
  {
    discordSnowflake: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    paranoid: true,
    sequelize: db,
    modelName: 'DiscordGuild',
  }
);

module.exports = DiscordGuild;