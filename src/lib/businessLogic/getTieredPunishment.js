const {DiscordRuleActionTier, DiscordGuildRuleWarning, RuleAction} = require('../database/models');
const logger = require('../logger');

module.exports = async (discordGuildRuleId, userId, isOffense) => {
  if(!isOffense) return null;
  logger.info(`Handling tiered punishment for [userId=${userId}]`)
  console.log(discordGuildRuleId, userId)
  const tiers = await DiscordRuleActionTier.findAll({where: {discordGuildRuleId}, order: [['maxOffenses', 'asc']]});
  const punishments = await DiscordGuildRuleWarning.findAndCountAll({where: {discordGuildRuleId, discordUserId: userId}} );
  const mappedTiers = tiers.map(x => x.get({plain: true}));
  let ret = null;
  for(let i = 0; i < mappedTiers.length; i++){
    if(mappedTiers[i].maxOffenses > punishments.count + 1) continue;
    if(mappedTiers[i].maxOffenses <= punishments.count + 1 && mappedTiers[i+1]?.maxOffenses > punishments.count + 1 || !mappedTiers[i + 1]){
      ret = mappedTiers[i];
      break;
    }
  }
  if(ret){
    const ruleAction = await RuleAction.findOne({where: {id: ret.ruleActionId}});
    return ruleAction.get().name;
  }

  return undefined;
}