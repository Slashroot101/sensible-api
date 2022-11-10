const logger = require('../../logger');
const {DiscordGuild} = require('../../database/models');

module.exports = async function (fastify, opts){
  fastify.post('/', {}, async (req, reply) => {
    const {discordGuild} = req.body;
    logger.info(`Creating guild [discordSnowflake=${req.body.guild.discordSnowflake}]`);

     let guild = await DiscordGuild.fineOne({where: {discordSnowflake: discordGuild.discordSnowflake}});

     if(guild.get()){
      return reply.code(409).send({msg: 'Guild already exists, cannot create it'});
     }

     guild = await DiscordGuild({...discordGuild}).save();

     return { discordGuild: guild.get() };
  });
};