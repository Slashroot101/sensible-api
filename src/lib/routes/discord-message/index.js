const logger = require('../../logger');
const {Message} = require('../../database/models');

module.exports = async function (fastify, opts){
  fastify.post('/', {}, async (req, reply) => {
    logger.info(`Initiating create discord-message request for user [userId=${message.discordUserId}]`);
    const {message} = req.body;

    const savedMessage = await new Message({...message}).save();

    return {message: savedMessage.get()};
  });

  fastify.get('/', {}, async (req, opts) => {
    logger.info(`Initiating DiscordMessage query with query params: ${JSON.stringify(req.query)}`);
    const {discordUserId, sentiment, messageId} = req.query;

    const messages = await new Message({discordUserId, sentiment, messageId}).save();

    return {messages: messages.map(x => x.get())};
  });
};