const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordUser extends Model {
	static associate() {}
}

DiscordUser.init(
	{
		discordSnowflake: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		paranoid: true,
		sequelize: db,
		modelName: 'DiscordUser',
	},
);

module.exports = DiscordUser;