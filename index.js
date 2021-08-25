/* eslint-disable no-inner-declarations*/

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
	if(isCommand('football')) {
		const positions = {
			left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
			middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
			right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
		};
		let randomized = Math.floor(Math.random() * Object.keys(positions).length);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'left',
						label: 'Left',
					},
					{
						type: 2,
						style: 'PRIMARY',
						custom_id: 'middle',
						label: 'Middle',
					},
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'right',
						label: 'Right',
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: randomPos,
			components: componentsArray,
		});
		function update() {
			randomized = Math.floor(Math.random() * Object.keys(positions).length);
			randomPos = positions[Object.keys(positions)[randomized]];

			msg.edit({
				content: randomPos,
				components: componentsArray,
			});
		}
		setInterval(() => {
			if(gameEnded == false) return update();
		}, 1000);

		const filter = button => {
			return button.user.id === message.author.id;
		};
		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		if(button.customId !== Object.keys(positions)[randomized]) {
			gameEnded = true;
			return button.reply({ content: 'You won!' });
		}
		else {
			gameEnded = true;
			return button.reply({ content: 'You lose...' });
		}
	}
	if(isCommand('fightgun')) {
		const opponent = message.mentions.users.first();
		const positions = {
			three: '_ _        :levitate: :point_right:      **3**        :point_left: :levitate:',
			two: '_ _        :levitate: :point_right:      **2**        :point_left: :levitate:',
			one: '_ _        :levitate: :point_right:      **1**        :point_left: :levitate:',
			go: '_ _        :levitate: :point_right:      **GO!**        :point_left: :levitate:',
			ended1: '_ _     :levitate: :point_right:      **STOP!**        :skull_crossbones: :levitate:',
			ended2: '_ _     :levitate: :skull_crossbones:      **STOP!**        :point_left: :levitate:',
		};

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						label: 'Shoot!',
						custom_id: 'shoot1',
						style: 'PRIMARY',
						disabled: true,
					},
					{
						type: 2,
						label: '\u200b',
						custom_id: 'id lol useless',
						style: 'SECONDARY',
						disabled: true,
					},
					{
						type: 2,
						label: 'Shoot!',
						custom_id: 'shoot2',
						style: 'DANGER',
						disabled: true,
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: positions.three,
			components: componentsArray,
		});

		function countdown() {
			setTimeout(() => {
				msg.edit({
					content: positions.two,
					components: componentsArray,
				});
			}, 1000);
			setTimeout(() => {
				msg.edit({
					content: positions.one,
					components: componentsArray,
				});
			}, 2000);
			setTimeout(() => {
				componentsArray[0].components[0].disabled = false;
				componentsArray[0].components[2].disabled = false;
				msg.edit({
					content: positions.go,
					components: componentsArray,
				});
			}, 3000);
		}
		countdown();

		const filter = button => {
			return button.user.id == message.author.id || button.user.id == opponent.id;
		};

		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		componentsArray[0].components[0].disabled = true;
		componentsArray[0].components[2].disabled = true;

		if(button.customId === 'shoot1' && button.user.id == message.author.id) {
			msg.edit({
				content: positions.ended1,
				components: componentsArray,
			});
			return button.reply({ content: `<@${message.author.id}> won!` });
		}
		else if(button.customId === 'shoot2' && button.user.id == opponent.id) {
			msg.edit({
				content: positions.ended1,
				components: componentsArray,
			});
			return button.reply({ content: `<@${opponent.id}> won!` });
		}
	}
});

client.login(process.env.token);