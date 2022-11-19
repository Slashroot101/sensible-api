const logger = require('../../logger');
const {DiscordGuildRuleWarning, Rules, DiscordGuildRule, RuleAction} = require('../../database/models');

module.exports = async (fastify, opts) => {
    fastify.post('/discord-guild-rule/:ruleId', {}, async (req, reply) => {
        logger.info(`Received create request for [ruleId=${req.params.ruleId}`);
        const { warning } = req.body;
        const savedWarning = await new DiscordGuildRuleWarning({...warning}).save();
        logger.info(`Created warning [discordGuildRuleWarning=${savedWarning.get().id}]`);
        return {warning: savedWarning.get()};
    });

    fastify.patch('/:warningId', {}, async (req, reply) => {
        logger.info(`Received patch reqeust for [ruleId=${req.params.warningId}`);
        let warning = await DiscordGuildRuleWarning.findOne({where: {id: req.params.warningId}});
        if(!warning) {
            return reply.code(404).send({msg: 'Warning does not exist yet'});
        }
        logger.info(`Patching warning [id=${req.params.warningId}] to expunged=${req.body.warning.expunged} by expungedBy=${req.body.warning.expungedBy}`);
        warning = await DiscordGuildRuleWarning.update({expunged: req.body.warning.expunged, expungedBy: req.body.warning.expungedBy}, {where: {id: req.params.warningId}, returning: true});
        return {warning: warning.length ? warning[1].dataValues : warning.get()};
    });

    fastify.get('/', {}, async (req, reply) => {
        logger.info('Received query request for rule warnings');
        const {discordUserId} = req.query;

        const warnings = await DiscordGuildRuleWarning.findAll({include: [{model: DiscordGuildRule, include: [ {model: Rules}, {model: RuleAction}]},], where: {discordUserId}});

        return {warnings: warnings.map(x => x.get({plain: true}))};
    });
}