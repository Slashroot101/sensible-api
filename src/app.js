const path = require('path');
const autoload = require('@fastify/autoload');
const database = require('./lib/database/index');
const models = require('./lib/database/models');
const {forceDbReset} = require('./lib/config');
const seed = require('./lib/database/seed');

module.exports = async (fastify, opts) => {
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