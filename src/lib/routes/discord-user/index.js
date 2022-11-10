const {DiscordUser} = require('../../database/models');
const logger = require('../../logger');

module.exports = async function (fastify, opts){
    fastify.post('/', {}, async (req, reply) => {
        const {discordUser} = req.body;
        logger.info(`Initiating create DiscordUser request for user [snowflake=${discordUser.discordSnowflake}].`);
        
        const existingUser = await DiscordUser.findOne({where: {discordSnowflake: req.body.discordUser.discordSnowflake}});

        if(existingUser){
            logger.info(`Hitting back request for user [snowflake=${discordUser.discordSnowflake}] because the user already exists.`);
            return reply.code(409).send({msg: 'User already exists, cannot create duplicate'});
        }

        const user = await new DiscordUser(discordUser).save();
        logger.info(`Succesfully created user [id=${user.get().id}]`);
        return {discordUser: user.get()};
    });

    fastify.patch('/:id', {}, async (req, reply) => {
        logger.info(`Initiating patch request for DiscordUser [id=${req.params.id}]`);
        const {discordUser} = req.body;

        const existingUser = await DiscordUser.findOne({where: {id: req.params.id}});

        if(!existingUser){
            logger.info(`Hitting back request for user [id=${req.params.id}] because the user does not exist yet.`);
            return reply.code(400).send({msg: 'User does not exist, please create them first'});
        }

        const updatedUser = await DiscordUser.update(discordUser, {where: {id: req.params.id}, returning: true});
        logger.info(`Succesfully patched user [id=${req.param.id}]`);
        return {discordUser: updatedUser[1]};
    });

    fastify.get('/', {}, async (req, reply) => {
        logger.info(`Initiating DiscordUser query with query params: ${JSON.stringify(req.query)}`);
        const {discordSnowflake} = req.query;

        const discordUsers = await DiscordUser.findAll({where: {discordSnowflake}});

        return {discordUsers: discordUsers.map(x => x.get())};
    });
};