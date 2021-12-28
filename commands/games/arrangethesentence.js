module.exports = {
	name: 'arrangethesentence',
	aliases: ['ats'],
	execute: async (client, message) => {

		const generator = require('txtgen');
		const sentence = generator.sentence();
		const sentenceArray = sentence.split(' ');
		const randomSentenceArray = client.util.shuffleArray(sentenceArray);
		const userSentenceArray = [];

		const componentsArray = [
			{ type: 1, components: [] },
			{ type: 1, components: [] },
			{ type: 1, components: [] },
			{ type: 1, components: [] },
			{ type: 1, components: [] },
		];

		let i = 0;

		randomSentenceArray.forEach((text) => {
			i++;
			if(i <= 5 && componentsArray[0].components.length !== 5) { componentsArray[0].components.push({ type: 2, custom_id: `${i}_${text}_0`, label: text, style: 'SECONDARY' }); }
			else if(i > 5 && componentsArray[1].components.length !== 5) { componentsArray[1].components.push({ type: 2, custom_id: `${i}_${text}_1`, label: text, style: 'SECONDARY' }); }
			else if(i > 10 && componentsArray[2].components.length !== 5) { componentsArray[2].components.push({ type: 2, custom_id: `${i}_${text}_2`, label: text, style: 'SECONDARY' }); }
			else if(i > 15 && componentsArray[3].components.length !== 5) { componentsArray[3].components.push({ type: 2, custom_id: `${i}_${text}_3`, label: text, style: 'SECONDARY' }); }
			else if(i > 20 && componentsArray[4].components.length !== 5) { componentsArray[4].components.push({ type: 2, custom_id: `${i}_${text}_4`, label: text, style: 'SECONDARY' }); }
		});

		i = 0;

		const msg = await message.channel.send({
			content: 'Press the buttons in the order to create the right sentence!',
			components: componentsArray.filter(e => e.components.length !== 0),
		});

		const filter = button => { return button.user.id === message.author.id; };
		const game = await message.channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		});

		game.on('collect', button => {
			button.deferUpdate();

			const buttonParts = button.customId.split('_');

			if(client.util.getAllIndexes(sentenceArray, buttonParts[1]).includes(i)) {
				i++;

				componentsArray[buttonParts[2]].components[buttonParts[0] - 5 * buttonParts[2]].style = 'SUCCESS';
				componentsArray[buttonParts[2]].components[buttonParts[0] - 5 * buttonParts[2]].disabled = true;

				userSentenceArray.push(buttonParts[1]);

				msg.edit({
					content: userSentenceArray.join(' '),
					componentsArray: componentsArray.filter(e => e.components.length !== 0),
				});
			}
		});
	},
};