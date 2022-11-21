const logger = require('../../logger');
const {DiscordRuleActionTier} = require('../../database/models');

module.exports = async (fastify, options) => {
  fastify.patch('/:tierId', {}, async (req, reply) => {
    logger.info(`Received patch request for [tierId=${req.params.tierId}]`);

    const updatedTier = await DiscordRuleActionTier.update({...req.body.tier}, {where: {id: req.params.tierId}, returning: true});
    return {tier: updatedTier[1][0].get({plain: true})};
  });

  fastify.post('/', {}, async (req, reply) => {
    logger.info(`Received post request for new tier [discordGuildId=${req.body.tier.discordGuildRuleId}]`);
    const existingTier = await DiscordRuleActionTier.findOne({where: {ruleActionId: req.body.tier.ruleActionId, discordGuildRuleId: req.body.tier.discordGuildRuleId}});

    const mappedTier = existingTier?.get({plain: true});
    if(mappedTier){
      logger.info(`Tier already existed, returning [discordRuleActionTier=${mappedTier?.id}]`);
      return reply.send({tier: existingTier});
    }

    logger.info(`Creating tier for [discordGuildId=${req.body.tier.discordGuildRuleId}] because none was found `);
    const savedTier = await new DiscordRuleActionTier({...req.body.tier}).save();

    return {tier: savedTier?.get({plain: true})};
  });

  fastify.get('/guild-rule/:guildRuleId/action/:actionId', {}, async (req, reply) => {
    const {guildRuleId, actionId} = req.params;
    logger.info(`Received query request for [discordGuildRuleId=${guildRuleId}]/[actionId=${actionId}]`)
  
    const tier = await DiscordRuleActionTier.findOne({where: {ruleActionId: actionId, discordGuildRuleId: guildRuleId}});
    return {tier: tier?.get({plain: true})};
  });
}