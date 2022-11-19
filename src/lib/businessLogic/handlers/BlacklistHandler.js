const {DiscordGuildBlacklist} = require('../../database/models');
const logger = require('../../logger');

module.exports = class BlacklistHandler {
  async process(toggled, user, guild, msg) {
    logger.info(`Starting blacklist processing for msg [guildId=${guild.id}]/[userId=${user.id}]`);
    const blacklistedWords = await DiscordGuildBlacklist.findAll({where: {discordGuildId: guild.id}});
    const mappedWords = blacklistedWords.map(x => x.get({plain: true})).map(x => x.word);
    console.log(mappedWords)
    let ret = false;
    for(const word of mappedWords){
      if(msg.includes(word)){
        logger.info(`Found blacklisted word [word=${word}] in [userId=${user.id}]/[guild=${guild.id}]`);
        ret = true;
        break;
      }
    }
    return ret;
  }
}