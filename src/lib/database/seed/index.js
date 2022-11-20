const logger = require('../../logger');
const {Rules, RuleAction} = require('../models/index');

module.exports = async () => {
    logger.info('Seeding rule data');
    await Rules.findOrCreate({where: {name: 'swearing'}, create: {id: 1, name: "swearing"}});
    await Rules.findOrCreate({where: {name: 'blacklist'}, create: {id: 2, name: "blacklist"}});
    await Rules.findOrCreate({where: {name: 'sentiment'}, create: {id: 3, name: "sentiment"}});
    logger.info('Completed rule data seeding');

    logger.info('Seeding rule action data');
    await RuleAction.findOrCreate({where: {name: 'timeout'}, create: {id: 1, name: "timeout"}});
    await RuleAction.findOrCreate({where: {name: 'ban'}, create: {id: 2, name: "ban"}});
    await RuleAction.findOrCreate({where: {name: 'kick'}, create: {id: 3, name: "kick"}});
    await RuleAction.findOrCreate({where: {name: 'warn'}, create: {id: 4, name: "warn"}});
    await RuleAction.findOrCreate({where: {name: 'tiered'}, create: {id: 5, name: "tiered"}});
    logger.info('Completed seeding rule action data');
}