const logger = require('../../logger');
const {DiscordGuildRule} = require('../../database/models');

module.exports = async (fastify, opts) => {
    fastify.patch('/discord-guild/:id', {}, async (req, reply) => {
        logger.info(`Received update request for rule ${req.body.rule.name} in guild [discordGuildId=${req.params.id}] to be ${req.body.rule.enabled}`);
        let rule = await DiscordGuildRule.findOne({where: {ruleName: req.body.rule.ruleName, discordGuildId: req.params.id}});

        if(!rule){
            const createdRule = await new DiscordGuildRule({...req.body.rule, discordGuildId: req.params.id}).save();
            return {DiscordGuildRule: createdRule.get()};
        }

        rule = await DiscordGuildRule.update({enabled: req.body.rule.enabled, ruleAction: req.body.rule.ruleAction}, {where: {discordGuildId: req.params.id}, returning: true});

        return {DiscordGuildRule: rule.get()};
    });
}