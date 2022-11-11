const {RuleAction} = require('../../database/models');
const logger = require('../../logger');

module.exports = async function (fastify, opts){
  fastify.get('/list', {}, async (req, reply) => {
    logger.info('Retrieving list of rule actions');

    const ruleActions = await RuleAction.findAll();

    return {ruleActions: ruleActions.map(x => x.get())};
  });
}