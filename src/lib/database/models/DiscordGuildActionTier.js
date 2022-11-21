const db = require('../index');
const {Model, DataTypes} = require('sequelize');

class DiscordGuildActionTier extends Model {
  static associate(models) {
    models.DiscordRuleActionTier.belongsTo(models.DiscordGuildRule, {foreignKey: {name: 'discordGuildRuleId'}});
    models.DiscordRuleActionTier.belongsTo(models.RuleAction, {foreignKey: {name: 'ruleActionId'}});
  }
}

DiscordGuildActionTier.init(
  {
    maxOffenses: {
      type: DataTypes.INTEGER,
    },
  }, 
  {
    paranoid: true,
    sequelize: db,
    modelName: 'DiscordGuildActionTier', 
  }
);

module.exports = DiscordGuildActionTier;