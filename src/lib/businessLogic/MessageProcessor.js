const logger = require("../logger");
const BlacklistHandler = require("./handlers/BlacklistHandler");
const SentimentHandler = require("./handlers/SentimentHandler");
const SwearingHandler = require("./handlers/SwearingHandler");


module.exports = class MessageProcessor {

  async process(flags, user, guild, msg){
    const punishments = [];

    logger.info(`Handling message processing for [userId=${user.id}] and [guildId=${guild.id}]`);
    if(flags.swearing) {
      const containsSwearing = await new SwearingHandler().process(...arguments);
      punishments.push({swearing: {
        contains: containsSwearing,
        punishment: flags.swearing.ruleAction.name,
      }});
    };
    if(flags.blacklist) {
      const containsBlacklist = await new BlacklistHandler().process(...arguments);
      punishments.push({blacklist: {
        contains: containsBlacklist,
        punishment: flags.blacklist.ruleAction.name,
      }});
    }
    if(flags.sentiment) {
      await new SentimentHandler().process(...arguments);
      punishments.push({sentiment: {
        contains: null,
      }});
    }
    logger.info(`Completed message processing for [userId=${user.id}] and [guildId=${guild.id}]`);

    return punishments;
  }

}