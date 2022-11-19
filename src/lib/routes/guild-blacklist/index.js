const logger = require('../../logger');
const {DiscordGuildBlacklist} = require('../../database/models');

module.exports = async (fastify, opts) => {
  fastify.post('/discord-guild/:guildId', {}, async (req, reply) => {
    logger.info(`Received create request for [guildId=${req.params.guildId}]`);
    const { blacklist } = req.body;
    let blackListEntry = await DiscordGuildBlacklist.findAll({where: {discordGuildId: req.params.guildId, word: req.body.blacklist.word}});
    if(blackListEntry.length){
      logger.info(`Received create request for [guildId=${req.params.guildID}] but the word already existed`);
      return {blacklist: blackListEntry.map(x => x.get({plain: true}))};
    }

    blackListEntry = await new DiscordGuildBlacklist({...blacklist, discordGuildId: req.params.guildId}).save();

    return {blacklist: blackListEntry.get()};
  });

  fastify.put('/discord-guild/:guildId/delete', {}, async (req, reply) => {
    logger.info(`Received delete request for [guildId=${req.params.guildId} and word [word=${req.body.word}]]`);
    const { word } = req.body.blacklist;

    await DiscordGuildBlacklist.destroy({where: {word, discordGuildId: req.params.guildId}});
  });
};