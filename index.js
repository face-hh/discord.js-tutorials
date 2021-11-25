/* eslint-disable no-inner-declarations*/

const Discord = require('discord.js');

require('dotenv').config();
const client = new Discord.Client({ intents: 32767 });

client.commands = new Discord.Collection();
client.scommands = new Discord.Collection();
client.scommandsArray = [];
client.aliases = new Discord.Collection();
client.oneWordStoryData = {};
client.util = require('./util/util');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

client.login(process.env.token);

require('./util/handlers')(client);