const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class User extends Model {
	// eslint-disable-next-line no-empty-function
	static associate() {}
}

User.init(
	{
		discordUserId: {
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

module.exports = User;