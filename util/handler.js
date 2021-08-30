const fs = require('fs');

module.exports = async function startUp(client) {
	const eventFolder = fs.readdirSync('./events/').filter((file) => file.endsWith('.js'));
	for (const file of eventFolder) {
		const event = require(`../events/${file}`);
		const eventName = file.slice(0, -3);

		client.on(eventName, event.bind(null, client));

		console.log(`\x1b[31m[LOGS] \x1b[33m[EVENTS] \x1b[36m${eventName}\x1b[37m has been loaded.\x1b[0m`);
	}

	const commandFolder = await fs.readdirSync('./commands/');
	for (const direct of commandFolder) {

		const commandFiles = fs.readdirSync(`./commands/${direct}/`).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const object = require(`../commands/${direct}/${file}`);

			client.commands.set(object.name, object);
			object.aliases.forEach((alias) => {
				client.aliases.set(alias, object.name);
			});

			console.log(`\x1b[31m[LOGS] \x1b[35m[CMDS] \x1b[36m${object.name}\x1b[37m has been loaded.\x1b[0m`);
		}
	}
};