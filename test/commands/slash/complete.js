const { SlashCommand } = require('../../../src');

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
					type: SlashCommand.OptionTypes.STRING,
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