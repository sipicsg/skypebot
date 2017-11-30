/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
// var bot = new builder.UniversalBot(connector), function (session) {
//     session.send("You said: %s", session.message.text);
// });

var bot = new builder.UniversalBot(connector);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
  session.send("ConversionId is: %s", session.message.address.conversation);
});


/*
bot.dialog('/', function (session) {
    session.send("hi");
});

bot.on('conversationUpdate', function (message) {
  console.log(message.address);
  if (message.membersAdded && message.membersAdded.length > 0) {
    var membersAdded = message.membersAdded
        .map(function (m) {
          var isSelf = m.id === message.address.bot.id;
          return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
        })
        .join(', ');

    bot.send(new builder.Message()
        .address(message.address)
        .text('Welcome ' + membersAdded));
  }

  if (message.membersRemoved && message.membersRemoved.length > 0) {
    var membersRemoved = message.membersRemoved
        .map(function (m) {
          var isSelf = m.id === message.address.bot.id;
          return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
        })
        .join(', ');

    bot.send(new builder.Message()
        .address(message.address)
        .text('The following members ' + membersRemoved + ' were removed or left the conversation :('));
  }
});

/*
const express = require('express')
const app = express()

app.get('/message', (request, response) => {
    var SkypeMessage = request.query.msg;
    bot.getStorage().SendToConversationAsync
    bot.send(SkypeMessage);
});

app.listen(3000);
*/
