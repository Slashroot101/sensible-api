const {Model, DataTypes} = require('sequelize');
const db = require('../index');

class Message extends Model {
    static associate(models){
        models.Message.belongsTo(models.DiscordUser, {foreignKey: {name: 'discordUserId',}});
    }
}

Message.init(
    {
        message: {
            type: DataTypes.STRING,
        },
        sentiment: {
            type: DataTypes.DOUBLE,
        },
        comparative: {
            type: DataTypes.DOUBLE,
        },
        messageId: {
            type: DataTypes.STRING,
        },
    },
    {
		paranoid: true,
		sequelize: db,
		modelName: 'Message',
	},
);

module.exports = Message;