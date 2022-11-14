const path = require('path');
const autoload = require('@fastify/autoload');
const database = require('./lib/database/index');
const models = require('./lib/database/models');
const {forceDbReset} = require('./lib/config');
const {events} = require('./lib/queue/index');
const seed = require('./lib/database/seed');
const logger = require('./lib/logger');

module.exports = async (fastify, opts) => {
  const nats = await require('./lib/nats');

  logger.info('Beginning NATS subscriptions');
  events.forEach(async e => {
    logger.info(`Subscribing to ${e.name} queue`);
    nats.subscribe(e.name, {callback: e.handler});
  });
  logger.info('Completed NATS subscriptions');

  fastify.register(autoload, {
    dir: path.join(path.resolve(), 'src', 'lib', 'routes'),
    options: Object.assign({}, opts)
  });

  Object.keys(models).forEach((ele) => {
		models[ele].associate(models);
	});

  await database.sync({ force: forceDbReset === 'true' });
  await seed();
};