const Module = require('../Module');

module.exports = class AutocompleteModule extends Module {
	constructor(client) {
		super(client, 'autocomplete');

		this.client.on('interactionCreate', this.handleInteraction);
	}

	/**
	 * Handle an interaction
	 * @param {import('discord.js').Interaction} interaction
	 */
	async handle(interaction) {
		if (!interaction.isAutocomplete()) return;
		// ...
	}
};