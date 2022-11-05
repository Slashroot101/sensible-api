const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class ConfigStore extends Model {

}

ConfigStore.init(
    {
        ruleName: {
            type: DataTypes.STRING,
        },
        ruleAction: {
            type: DataTypes.STRING,
        },
        guildId: {
            type: DataTypes.STRING,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        paranoid: true,
        sequelize: db,
        modelName: 'ConfigStore',
    },
);

module.exports = ConfigStore;