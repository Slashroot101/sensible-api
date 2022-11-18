const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordGuildRuleWarning extends Model {
    static associate(models){
        models.DiscordGuildRuleWarning.belongsTo(models.DiscordGuildRule, {foreignKey: {name: 'discordGuildRuleId'}});
        models.DiscordGuildRuleWarning.belongsTo(models.Message, {foreignKey: {name: 'messageId'}});
        models.DiscordGuildRuleWarning.belongsTo(models.DiscordUser, {foreignKey: {name: 'discordUserId'}});
        models.DiscordGuildRuleWarning.belongsTo(models.DiscordUser, {foreignKey: {name: 'expungedBy'}});
    }
}


DiscordGuildRuleWarning.init(
        {
            expunged: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            paranoid: true,
            sequelize: db,
            modelName: 'DiscordGuildRuleWarning',
        },
);

module.exports = DiscordGuildRuleWarning;