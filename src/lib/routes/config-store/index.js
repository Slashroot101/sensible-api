const logger = require('../../logger');
const {DiscordGuildRule} = require('../../database/models');

module.exports = async (fastify, opts) => {
    fastify.patch('/discord-guild/:id/rule/:ruleId', {}, async (req, reply) => {
        logger.info(`Received update request for rule [ruleId=${req.params.ruleId}] in guild [discordGuildId=${req.params.id}] to be ${req.body.rule.enabled}`);
        console.log(req.params, req.body)
        let rule = await DiscordGuildRule.findOne({where: {ruleId: req.params.ruleId, discordGuildId: req.params.id}});
        if(rule?.get()){
            rule = await DiscordGuildRule.update(
                {enabled: req.body.rule.enabled, ruleActionId: req.body.rule.ruleActionId,},
                {where: {ruleId: req.params.ruleId, discordGuildId: req.body.rule.discordGuildId}, returning: true}
            );
            return {DiscordGuildRule: rule[1][0].get()};
        } else {
            rule = await new DiscordGuildRule({ruleId: req.body.rule.ruleId, ruleActionId: req.body.rule.ruleActionId, enabled: req.body.rule.enabled, discordGuildId: req.body.rule.discordGuildId}).save();
            return {DiscordGuildRule: rule.get()};
        }
    });

    fastify.get('/rule/:ruleId/action/:ruleActionId', {}, async (req, reply) => {
        const {ruleId, ruleActionId} = req.params;
        logger.info(`Received query request with [ruleId=${ruleId}]/[actionId=${ruleActionId}]`);
        const rule = await DiscordGuildRule.findOne({where: {ruleId, ruleActionId}});

        return {DiscordGuildRule: rule?.get({plain: true})};
    });
}