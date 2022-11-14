const logger = require("../logger");
const BlacklistHandler = require("./handlers/BlacklistHandler");
const SentimentHandler = require("./handlers/SentimentHandler");
const SwearingHandler = require("./handlers/SwearingHandler");


module.exports = class MessageProcessor {

  async process(flags, user, guild,){
    const punishment = [];
    logger.info(`Handling message processing for [userId=${user.id}] and [guildId=${guild.id}]`);
    if(flags.swearing) punishment = await new SwearingHandler().process();
    if(flags.blacklist) punishment = await new BlacklistHandler().process();
    if(flags.sentiment) punishment = await new SentimentHandler().process();
    logger.info(`Handling message processing for [userId=${user.id}] and [guildId=${guild.id}]`);
  }

}