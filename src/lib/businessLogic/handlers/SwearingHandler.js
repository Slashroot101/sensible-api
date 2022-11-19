const logger = require('../../logger')
const filter = require('leo-profanity');

module.exports = class SwearingHandler {
  async process(toggled, user, guild, msg) {
    if(!toggled) {
      logger.info(`SwearingHandler is not turned on for guild [guildId=${guild.id}]/[userId=${user.id}]`);
      return false;
    }

    const cleanedMsg = filter.badWordsUsed(msg);
    logger.info(`User [userId=${user.id}] used words [${cleanedMsg}] in message`);
    if(cleanedMsg.length){
      logger.info(`Swearing found in msg for [userId=${user.id}]/[guildId=${guild.id}]`);

      return true;
    }

    return false;
  }
}