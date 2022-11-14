const MessageProcessor = require("../../businessLogic/MessageProcessor");
const logger = require("../../logger");
const {DiscordGuildRule, Rules, RuleAction} = require('../../database/models');

module.exports = async (err, msg) => {
  const nats = await require('../../nats');

  logger.info(`Received event messageCreate`);
  if(err){
    return logger.info('Received error for NATS msg');
  }
  const parsedMessage = JSON.parse(msg.data.toString());
  
  if(!parsedMessage){
    logger.info(`Received empty message, returning`);

    return;
  }

  const rules = await DiscordGuildRule.findAll({include: [{model: Rules}, {model: RuleAction}], where: {discordGuildId: parsedMessage.guild.id, enabled: true}});
  const mappedRules = rules?.map(x => {
    const rule = x.get();
    return {enabled: rule.enabled, ruleName: rule.Rule.get().name, ruleAction: rule.RuleAction.get()};
  });
  
  const swearing = mappedRules.filter(x => x.ruleName === 'swearing')[0];
  const blacklist = mappedRules.filter(x => x.ruleName === 'blacklist')[0];
  const sentiment = mappedRules.filter(x => x.ruleName === 'sentiment')[0];

  const flags = {
    swearing,
    blacklist,
    sentiment,
  }
  const actions = await new MessageProcessor().process(flags, parsedMessage.user, parsedMessage.guild, parsedMessage.msg);

  nats.publish('punish', Buffer.from(JSON.stringify({...parsedMessage, punishments: actions})));
};