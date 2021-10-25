module.exports = async (client) => {
	console.log('Tutorial bot is ready to go!');
	await client.guilds.cache.get('877988588233580595').commands.set(client.scommandsArray);
};