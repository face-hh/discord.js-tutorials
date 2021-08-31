/* eslint-disable no-inner-declarations*/

const Discord = require('discord.js');

require('dotenv').config();
const client = new Discord.Client({ intents: 32767 });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('./util/handlers')(client);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

client.login(process.env.token);