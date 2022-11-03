const {Model, DataTypes} = require('sequelize');
const db = require('../index');

class MessageToken extends Model {
    static associate(models){
        models.MessageToken.belongsTo(models.Message, {foreignKey: {name: 'MessageId'}});
    }
}

MessageToken.init(
    {
        token: {
            type: DataTypes.STRING,
        },
        sentiment: {
            type: DataTypes.ENUM,
            values: ['Positive', 'Negative', 'Neutral'],
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        isWord: {
            type: DataTypes.BOOLEAN,
        },
    }, 
    {
      paranoid: true,
      sequelize: db,
      modelName: 'MessageToken',
    }
);

module.exports = MessageToken;