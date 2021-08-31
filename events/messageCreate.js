module.exports = async (client, message) => {
	if(message.author.bot || !message.guild) return;

	const prefix = '?';

	if(!message.content.startsWith(prefix)) return;

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