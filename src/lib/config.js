const dotenv = require('dotenv');

dotenv.config({ path: `${process.cwd()}/.${process.env.NODE_ENV.replace(' ', '')}.env`});

module.exports = {
  dbName: process.env.POSTGRES_DB,
	dbUsername: process.env.POSTGRES_USER,
	dbPassword: process.env.POSTGRES_PASSWORD,
	dbHost: process.env.DB_HOST,
  forceDbReset: process.env.FORCE_DB_RESET ?? false,
	natsUrl: process.env.NATS_URL,
};