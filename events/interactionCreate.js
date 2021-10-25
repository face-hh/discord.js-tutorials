module.exports = async (client, interaction) => {
	if (interaction.isCommand()) {
		try {
			await interaction.deferReply({ ephemeral: true });

			const cmd = client.scommands.get(interaction.commandName);
			const args = [];

			for (const option of interaction.options.data) {
				if (option.type === 'SUB_COMMAND') {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				}
				else if (option.value) {args.push(option.value);}
			}
			interaction.member = interaction.guild.members.cache.get(interaction.user.id);

			cmd.execute(client, interaction, args);
		}
		catch(error) {
			interaction.followUp('Error!');
			console.log(error);
		}
	}
};