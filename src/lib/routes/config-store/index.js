const logger = require('../../logger');
const {DiscordGuildRule} = require('../../database/models');

module.exports = async (fastify, opts) => {
    fastify.patch('/discord-guild/:id/rule/:ruleId', {}, async (req, reply) => {
        logger.info(`Received update request for rule [ruleId=${req.params.ruleId}] in guild [discordGuildId=${req.params.id}] to be ${req.body.rule.enabled}`);
        let rule = await DiscordGuildRule.findOne({where: {ruleId: req.params.ruleId, discordGuildId: req.params.id}});
        rule = await DiscordGuildRule.upsert({enabled: req.body.rule.enabled, ruleActionId: Number(req.body.rule.ruleActionId), discordGuildId: req.params.id, ruleId: req.params.ruleId}, {where: {discordGuildId: req.params.id, ruleId: req.params.ruleId}, returning: true});
        return {DiscordGuildRule: rule[0].get()};
    });

    fastify.get('/rule/:ruleId/action/:ruleActionId', {}, async (req, reply) => {
        const {ruleId, ruleActionId} = req.params;
        logger.info(`Received query request with [ruleId=${ruleId}]/[actionId=${ruleActionId}]`);
        const rule = await DiscordGuildRule.findOne({where: {ruleId, ruleActionId}});

        return {rule: rule?.get({plain: true})};
    });
}