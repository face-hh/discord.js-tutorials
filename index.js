<<<<<<< HEAD
/* eslint-disable */
const Discord = require('discord.js');
require('dotenv').config();
const voiceDiscord = require('@discordjs/voice');
const prefix = '?';
const client = new Discord.Client({ intents: 32767 });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

client.on('ready', () => {
	console.log('Tutorial bot is ready to go!');
});

client.on('messageCreate', async message => {

	// const args = message.content.slice(prefix.length).trim().split(/ +/g);

	function isCommand(command) {
		return !!message.content.toLowerCase().startsWith(prefix + command);
	}

	if(isCommand('soundboard')) {

		const channel = message.member.voice.channel;
		if(!channel) return message.channel.send('Bro join a voice channel smh :wink:');

		const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/877988588233580598/877991781063610439/bruh.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		// checking for ending, leaving vc if yes

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
	}
	if(isCommand('canvas')) {
		const Canvas = require('canvas');

		const canvas = Canvas.createCanvas(400, 400);
		const ctx = canvas.getContext('2d');
		const icon = await Canvas.loadImage('https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg');

		ctx.drawImage(icon, 113, 69, 175, 263);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'cat.png');

		return message.channel.send({ files: [attachment] });
	}

});
client.login('ODYyNjMzMDYzNTY4Mzc1ODEy.YObLpQ.6kDUfPtztDYrv_6S6YrsfQCx-sk');
=======
const Discord = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const prefix = '?';
const client = new Discord.Client({ intents: 32767 });

client.on('ready', () => {
    console.log('Tutorial bot is ready to go!')
})

client.on('messageCreate', async message => {

    function isCommand(command){
        return !!message.content.toLowerCase().startsWith(prefix + command);
    };
    
    if(isCommand('soundboard')){
        
        const channel = message.member.voice.channel;
        if(!channel) return message.channel.send('Bro join a voice channel smh :wink:');

        const player = voiceDiscord.createAudioPlayer();
        const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/877988588233580598/877991781063610439/bruh.mp3');

        const connection = voiceDiscord.joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        player.play(resource)
        connection.subscribe(player)

        // checking for ending, leaving vc if yes

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            connection.destroy() // leaves vc and destroys connection
        })
    }
})
client.login('ODYyNjMzMDYzNTY4Mzc1ODEy.YObLpQ.L9FbCcrALAOwiPIqsYf8HPWb9Q8')
>>>>>>> 24a25122e0f3287740f9729b8607a46196525219
