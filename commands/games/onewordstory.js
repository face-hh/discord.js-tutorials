module.exports = {
	name: 'onewordstory',
	aliases: ['ows'],
	execute: async (client, message) => {
		const channel = message.mentions.channels.first();

		if(!channel) return message.channel.send('Please mention a channel');
		if(channel.permissionsFor(message.guild.me).serialize(true).MANAGE_MESSAGES === false) return message.channel.send('I do not have MANAGE_MESSAGES permission');
		if(channel.permissionsFor(message.member).serialize(true).MANAGE_MESSAGES === false) return message.channel.send('You do not have permission to manage messages in that channel');

		client.oneWordStoryData[channel.id] = { words: [], lastUser: null };

		message.channel.send(`I have successfully set ${channel.name} as the new one word story game channel!`);
	},
};