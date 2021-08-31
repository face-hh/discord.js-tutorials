const fs = require('fs');

module.exports = async (client) => {
	const eventFiles = fs.readdirSync('./events/').filter((file) => file.endsWith('.js'));

	for(const file of eventFiles) {
		const event = require(`../events/${file}`);
		const eventName = file.slice(0, -3);

		client.on(eventName, event.bind(null, client));

		console.log(`\x1b[31m[LOGS] \x1b[33m[EVENTS] \x1b[36m${eventName}\x1b[37m has been loaded.\x1b[0m`);
		//                RED            YELLOW          CYAN                 WHITE                    RESET TO DEFAULT COLOR
	}

	const commandsFiles = fs.readdirSync('./commands/');

	for(const dir of commandsFiles) {

		const files = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'));

		for(const file of files) {
			const object = require(`../commands/${dir}/${file}`);

			client.commands.set(object.name, object);

			object.aliases.forEach((alias) => {
				client.aliases.set(alias, object.name);
			});
			console.log(`\x1b[31m[LOGS] \x1b[35m[CMDS] \x1b[36m${object.name}\x1b[37m has been loaded.\x1b[0m`);
			//               RED              MAGENTA       CYAN                   WHITE               RESET TO DEFAULT COLOR
		}
	}
};