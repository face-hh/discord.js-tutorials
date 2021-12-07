module.exports = {
	name: 'catchme',
	description: 'catch that zombie hand lol',
	execute: async (client, interaction) => {
		console.log(interaction.member.id);
		let i = 0;
		let ii = 0;
		let where = [
			['o', 'o', 'o', 'o'],
			['o', 'X', 'o', 'o'],
			['o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o'],
		];

		const oEmoji = '907626399924371507';
		const xEmoji = '907625960583606282';
		const timestamp = Date.now();
		const prettyms = require('pretty-ms');

		let gameEnded = false;
		let componentsArray = [];

		// Setting up the buttons fields.
		async function createFields() {
			componentsArray = [];
			where.forEach((field) => {
				componentsArray[i] = { type: 1, components: [] };
				field.forEach((line) => {
					const customid = line === 'X' ? 'X' : String(Math.random());
					const emoji = line === 'X' ? xEmoji : oEmoji;
					componentsArray[i].components[ii] = {
						type: 2,
						style: 1,
						custom_id: customid,
						emoji: { id: emoji },
						label: '\u200b',
					};
					ii++;
				});
				i++;
			});
		}
		await createFields();
		cleanEmptyObjects();

		// Filter empty objects.
		function cleanEmptyObjects() {
			componentsArray = componentsArray.filter((e) => typeof e !== undefined);
			componentsArray[0].components = componentsArray[0].components.filter((e) => typeof e !== undefined);
			componentsArray[1].components = componentsArray[1].components.filter((e) => typeof e !== undefined);
			componentsArray[2].components = componentsArray[2].components.filter((e) => typeof e !== undefined);
			componentsArray[3].components = componentsArray[3].components.filter((e) => typeof e !== undefined);
		}
		interaction.followUp({
			content: '\u200b',
			components: componentsArray,
			ephemeral: true,
		});
		const gameData = { left: 5 };

		const interval = setInterval(async () => {
			if(gameEnded === true) clearInterval(interval);

			// Generating where to put the X on a 4x4 table.
			const randomField = Math.floor(Math.random() * 4);
			const randomLine = Math.floor(Math.random() * 4);

			where = [
				['o', 'o', 'o', 'o'],
				['o', 'o', 'o', 'o'],
				['o', 'o', 'o', 'o'],
				['o', 'o', 'o', 'o'],
			];
			where[randomField][randomLine] = 'X';
			await createFields();
			cleanEmptyObjects();

			interaction.editReply({
				content: '\u200b',
				components: componentsArray,
				ephemeral: true,
			});
		}, 2000);

		const collector = await interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			filter: function(ea) { return ea.member.id === interaction.member.id; },
		});
		const msg2 = await interaction.channel.send('Here will be displayed who caught the candies!');
		collector.on('collect', async int => {
			int.deferUpdate();

			if(int.customId === 'X') {
				gameData.left--;
				if(gameData.left === 0) {
					msg2.edit(`GG! All the zombie hands has been caught. It took you exactly **${prettyms(Date.now() - timestamp)}**`);
					collector.stop();
					return gameEnded = true;
				}
				msg2.edit('One zombie hand has been caught, `' + gameData.left + '` more remaining!');
			}
		});
	},
};