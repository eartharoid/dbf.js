const { Autocompleter } = require('../../src');

module.exports = class FruitCompleter extends Autocompleter {
	constructor(client) {
		super(client, { id: 'fruit' });
	}

	/**
	 * @abstract
	 * @param {import('discord.js').AutocompleteInteraction} interaction
	 * @param {import('../commands/DiscordCommand')} command
	 * @param {string} value
	 */
	async run(interaction, command, value) {
		// if (command ...) ...
		const fruits = [
			{
				name: '🍎 Apple',
				value: 'apple',
			},
			{
				name: '🔵 Blueberry',
				value: 'blueberry',
			},
			{
				name: '🍒 Cherry',
				value: 'cherry',
			},
		];
		const options = value ? fruits.filter(f => f.match(new RegExp(value, 'i'))) : fruits;
		return interaction.respond(options.slice(0, 25));
	}
};