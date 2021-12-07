const ytdl = require('ytdl-core');
const Discord = require('@discordjs/voice');
const youtubesearchapi = require('youtube-search-api');

module.exports = {
	name: 'search',
	aliases: [],
	execute: async (_client, message) => {
		const channel = message.member.voice.channel;

		const { items } = await youtubesearchapi.GetListByKeyword('polo g bad guy', false, 10);

		if(!channel) return message.reply('sorry, you must join a voice channel to use this');

		message.channel.send(items.map((item) => `**${items.indexOf(item) + 1}**. ${item.title} \`${item.length.simpleText}\``).join('\n'));

		const collector = await message.channel.createMessageCollector({
			filter: ((user) => user.author.id === message.author.id),
			max: 1,
			time: 15000,
		});

		collector.on('collect', async msg => {
			if(isNaN(msg.content) || ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(parseInt(msg.content))) return message.channel.send('not an option or a number!');

			const stream = ytdl(`https://youtube.com?v=${items[msg.content].id}`, { filter: 'audioonly' });

			const player = Discord.createAudioPlayer();
			const resource = Discord.createAudioResource(stream);

			const connection = Discord.joinVoiceChannel({
				channelId: channel.id,
				guildId: message.guild.id,
				adapterCreator: message.guild.voiceAdapterCreator,
			});

			player.play(resource);
			connection.subscribe(player);

			player.on(Discord.AudioPlayerStatus.Idle, () => {
				connection.destroy();
			});
		});
	},
};