const logger = require("../../logger");


module.exports = async (msg) => {
  logger.info(`Received event messageCreate`);
  const parsedMessage = msg.data.length ? JSON.parse(msg.data.toString()) : null;

  if(!parsedMessage){
    logger.info(`Received empty message, returning`);

    return;
  }

  
};