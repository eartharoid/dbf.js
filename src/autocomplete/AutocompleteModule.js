const Module = require('../Module');

module.exports = class AutocompleteModule extends Module {
	constructor(client) {
		super(client, 'autocomplete');

		this.client.on('interactionCreate', interaction => this.handleInteraction(interaction));
	}

	/**
	 * Handle an interaction
	 * @param {import('discord.js').Interaction} interaction
	 */
	async handleInteraction(interaction) {
		if (!interaction.isAutocomplete()) return;

		const option = interaction.options.getFocused(true);
		if (!option) return;

		const completer = this.components.get(option.name);
		if (!completer) return;

		const command = this.client.commands.components.find(c => c.type === 'slash' && c.name === interaction.commandName);

		try {
			await completer.run(interaction, command, option.value);
		} catch (error) {
			this.emit('autocompleteError', completer, {
				command,
				error,
				interaction,
			});
		}
	}
};

/**
 * Emitted when a completer throws an error
 * @event AutocompleteModule#autocompleteError
 * @param {Component} completer The autocomplete that threw an error
 * @param {object} context
 * @param {Error} context.error The error
 * @param {Component} context.command The command this autocomplete interaction is for
 * @param {Interaction} context.interaction The autocomplete interaction
 */