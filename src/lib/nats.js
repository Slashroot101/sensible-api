const logger = require('../lib/logger');
const {connect} = require('nats');
const {natsUrl} = require('../lib/config');

module.exports = (async function(){
    logger.info('Connecting to NATS');
	const nats = await connect({
		servers: natsUrl,
	});
  logger.info('NATS connection complete');

  return nats;
})();