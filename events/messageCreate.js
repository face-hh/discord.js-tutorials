module.exports = async (client, message) => {
	if(message.author.bot || !message.guild) return;

	const prefix = '?';

	if(!message.content.startsWith(prefix)) {
		if(client.oneWordStoryData[message.channel.id]) {
			if(client.oneWordStoryData[message.channel.id].lastUser === message.author.id || client.util.isInvalidWord(message.content) === true) {
				return message.delete();
			}
			else {
				client.oneWordStoryData[message.channel.id].lastUser === message.author.id;
				client.oneWordStoryData[message.channel.id].words.push(message.content);

				if(message.content.includes('.')) {
					message.channel.send(`${client.oneWordStoryData[message.channel.id].words.join(' ')}` +
					'------------------------------------------------------');

					client.oneWordStoryData[message.channel.id] = { words: [], lastUser: null };
				}
			}
		}
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/g);

	let command = args.shift().toLowerCase();

	if(client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).name;

	const commandFile = client.commands.get(command);

	if(!commandFile) return;

	try {
		commandFile.execute(client, message, args);
	}
	catch (error) {
		console.log(error);
		message.channel.send('Something went wrong!');
	}
};