let i = 0;
let ii = 0;
let where = [
	['o', 'o', 'o', 'o'],
	['o', 'O', 'o', 'o'],
	['o', 'o', 'o', 'o'],
	['o', 'o', 'o', 'o'],
];

const oEmoji = '907626399924371507';
const xEmoji = '907625960583606282';
const timestamp = Date.now();
const prettyms = require('pretty-ms');

let gameEnded = false;
let componentsArray = [];

module.exports = {
	name: 'ctzh',
	description: 'catch that zombie hand minigame',
	execute: async (_client, interaction) => {

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

	},
};