const logger = require('../../logger');
const {DiscordGuild} = require('../../database/models');

module.exports = async function (fastify, opts){
  fastify.post('/', {}, async (req, reply) => {
    const {discordGuild} = req.body;
    logger.info(`Creating guild [discordSnowflake=${req.body.discordGuild.discordSnowflake}]`);
    console.log(discordGuild)
     let guild = await DiscordGuild.findOne({where: {discordSnowflake: discordGuild.discordSnowflake}});

     if(guild){
      return reply.code(200).send({discordGuild: guild.get()});
     }

     guild = await new DiscordGuild({...discordGuild}).save();

     return { discordGuild: guild.get() };
  });

  fastify.get('/', {}, async (req, reply) => {
    logger.info(`Executing DiscordGuild query with query params: ${JSON.stringify(req.query)}`);

    const {discordSnowflake} = req.query;

    const discordGuilds = await DiscordGuild.findAll({where: {discordSnowflake}});

    return {discordGuilds: discordGuilds.map(x => x.get())};
  });
};