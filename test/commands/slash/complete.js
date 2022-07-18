const { SlashCommand } = require('../../../src');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class CompleteCommand extends SlashCommand {
	constructor(client) {
		super(client, {
			description: 'Autocomplete test',
			id: 'slashComplete',
			name: 'complete',
			options: [
				{
					autocomplete: true,
					description: 'The name of the fruit',
					name: 'fruit',
					type: ApplicationCommandOptionType.String,
				},
			],
		});
	}

	/**
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	async run(interaction) {
		const fruit = interaction.options.getString('fruit');
		const text = fruit === 'apple'
			? 'Apple pie :pie:' : fruit === 'blueberry'
				? 'Blueberry muffin :cupcake:' : fruit === 'cherry'
					? 'Cherry cake :cake:' : 'nothing';
		await interaction.reply(text);
	}
};