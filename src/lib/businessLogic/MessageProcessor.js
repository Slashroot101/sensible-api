const logger = require("../logger");
const BlacklistHandler = require("./handlers/BlacklistHandler");
const SentimentHandler = require("./handlers/SentimentHandler");
const SwearingHandler = require("./handlers/SwearingHandler");
const getTieredPunishment = require('./getTieredPunishment');

module.exports = class MessageProcessor {

  async process(flags, user, guild, msg){
    const punishments = [];

    logger.info(`Handling message processing for [userId=${user.id}] and [guildId=${guild.id}]`);
    if(flags.swearing) {
      const containsSwearing = await new SwearingHandler().process(...arguments);
      let punishment = flags.swearing.ruleAction.name;
      if(punishment === 'tiered'){
        punishment = await getTieredPunishment(flags.swearing.guildRuleId, user.id, containsSwearing)
      }
      punishments.push({swearing: {
        contains: containsSwearing,
        punishment: punishment,
      }});
    };
    if(flags.blacklist) {
      const containsBlacklist = await new BlacklistHandler().process(...arguments);
      let punishment = flags.blacklist.ruleAction.name;
      if(punishment === 'tiered'){
        punishment = await getTieredPunishment(flags.blacklist.guildRuleId, user.id, containsBlacklist)
      }
      punishments.push({blacklist: {
        contains: containsBlacklist,
        punishment: punishment,
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