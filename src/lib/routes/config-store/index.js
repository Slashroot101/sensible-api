const logger = require('../../logger');
const {DiscordGuildRule} = require('../../database/models');

module.exports = async (fastify, opts) => {
    fastify.patch('/discord-guild/:id/rule/:ruleId', {}, async (req, reply) => {
        logger.info(`Received update request for rule [ruleId=${req.params.ruleId}] in guild [discordGuildId=${req.params.id}] to be ${req.body.rule.enabled}`);
        let rule = await DiscordGuildRule.findOne({where: {ruleId: req.params.ruleId, discordGuildId: req.params.id}});
        console.log(req.body)
        rule = await DiscordGuildRule.update({enabled: req.body.rule.enabled, ruleActionId: Number(req.body.rule.ruleActionId)}, {where: {discordGuildId: req.params.id, ruleId: req.params.ruleId}, returning: true});
        console.log(rule)
        return {DiscordGuildRule: rule.length ? rule[1].dataValues : rule.get()};
    });
}