const logger = require('../../logger')
const filter = require('leo-profanity');
const {DiscordGuildRuleWarning} = require('../../database/models');

module.exports = class SwearingHandler {
  async process(toggled, user, guild, msg) {
    if(!toggled) {
      logger.info(`SwearingHandler is not turned on for guild [guildId=${guild.id}]/[userId=${user.id}]`);
      return false;
    }

    const cleanedMsg = filter.clean(msg);

    if(msg !== cleanedMsg){
      logger.info(`Swearing found in msg for [userId=${user.id}]/[guildId=${guild.id}]`);

      return true;
    }

    return false;
  }
}