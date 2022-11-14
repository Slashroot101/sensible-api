const messageCreate = require('./events/messageCreate');


module.exports = { 
  events: [
        {name: 'MessageCreate', handler: messageCreate},
  ]
};