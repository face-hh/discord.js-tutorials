module.exports = async (client) => {
	console.log('Tutorial bot is ready to go!');
	await client.guilds.cache.get('881813009876520980').commands.set(client.scommandsArray);
};