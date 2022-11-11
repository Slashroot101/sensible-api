const {Rules} = require('../../database/models');
const logger = require('../../logger');

module.exports = async function (fastify, opts){
  fastify.get('/list', {}, async (req, reply) => {
    logger.info(`Retrieving list of rules`);
    const rules = await Rules.findAll();

    return {rules: rules.map(x => x.get())};
  });
}
