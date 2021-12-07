/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'rlgl',
	description: 'Play green line, red line in Discord!',
	execute: async (_client, interaction) => {

		const grass = '<:gressxd:897167292591394856>'; // https://cdn.discordapp.com/emojis/897167292591394856.png
		const square = '<:squidgamesquare:897165380873752576>'; // https://cdn.discordapp.com/emojis/897165380873752576.png
		const greenGirl = '<:girlfromback:897166943335874570>'; // https://cdn.discordapp.com/emojis/897166943335874570.png
		const redGirl = '<:girlfromfront:897166451125919754>'; // https://cdn.discordapp.com/emojis/897166451125919754.png
		const greenLine = '<:greenline:897168188721213481>'; // https://cdn.discordapp.com/emojis/897168188721213481.png
		const redLine = '<:redline:897168818634383370>'; // https://cdn.discordapp.com/emojis/897168818634383370.png
		const you = '<:mainchar:897167494018654230>'; // https://cdn.discordapp.com/emojis/897167494018654230.png
		const triangle = '<:squidgametriangle:897165507139076116>'; // https://cdn.discordapp.com/emojis/897165507139076116.png
		const colors = ['red', 'green'];


		const move = String(Math.random());
		const data = { left: 6, color: colors[Math.floor(Math.random() * colors.length)] };
		let gameEnded = false;


		const positions = {
			green: [`${grass + square + grass + greenGirl + grass + triangle + grass}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				[greenLine, grass.repeat(2), you, grass.repeat(2), greenLine]],
			red: [`${grass + square + grass + redGirl + grass + triangle + grass}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				[redLine, grass.repeat(2), you, grass.repeat(2), redLine]],
		};

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'xd',
						disabled: true,
						label: '\u200b',
					},
					{
						type: 2,
						style: 'PRIMARY',
						custom_id: move,
						label: 'Move',
					},
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'dx',
						disabled: true,
						label: '\u200b',
					},
				],
			},
		];

		interaction.followUp({
			content: positions[data.color].join('\n').replace(/,/g, ''),
			components: componentsArray,
			ephemeral: true,
		});

		const filter = (button => { return button.user.id === interaction.user.id;});
		const game = interaction.channel.createMessageComponentCollector({
			filter: filter,
			componentType: 'BUTTON',
		});

		function update(die, win) {
			if(win === true) {
				game.stop();
				gameEnded = true;
				componentsArray[0].components[1].disabled = true;

				interaction.followUp({
					content: 'you won',
					ephemeral: true,
				});
			}
			if(die === true) {
				game.stop();
				gameEnded = true;
				componentsArray[0].components[1].disabled = true;

				interaction.followUp({
					content: 'you lost',
					ephemeral: true,
				});
			}
			interaction.editReply({
				content: positions[data.color].join('\n').replace(/,/g, ''),
				components: componentsArray,
				ephemeral: true,
			});
		}

		setInterval(() => {
			if(gameEnded === false) data.color = colors[Math.floor(Math.random() * colors.length)];
			update();
		}, 2000);

		game.on('collect', async button => {
			button.deferUpdate();
			if(data.color === 'red') return update(true);
			if(data.left === 1) update(false, true);

			colors.forEach((color) => {
				const thearraytofind = positions[color].filter(x => Array.isArray(x));
				const i = positions[color].filter(x => Array.isArray(x)).map(x => positions[color].indexOf(x))[0];
				const databefore = positions[color][i - 1];

				positions[color][i - 1] = thearraytofind;
				positions[color][i] = databefore;
			});

			data.left--;
			update();
		});
	},
};
