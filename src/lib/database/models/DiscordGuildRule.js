const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordGuildRule extends Model {
    static associate(models) {
        models.DiscordGuildRule.belongsTo(models.DiscordGuild, {foreignKey: {name: 'discordGuildId'}});
        models.DiscordGuildRule.belongsTo(models.Rules, {foreignKey: {name: 'ruleId'}});
        models.DiscordGuildRule.belongsTo(models.RuleAction, {foreignKey: {name: 'ruleActionId'}});
    }
}

DiscordGuildRule.init(
    {
        enabled: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        paranoid: true,
        sequelize: db,
        modelName: 'DiscordGuildRule',
    },
);

module.exports = DiscordGuildRule;