const Component = require('../Component');

module.exports = class Autocompleter extends Component {
	/**
	 * Create a new menu autocompleter
	 * @param {import('../Client')} client
	 * @param {import('../Component').ComponentOptions} options
	 */
	constructor(client, options) {
		super(client, {
			id: options.id,
			moduleName: 'autocomplete',
		});

	}

	/**
	 * @abstract
	 * @param {import('discord.js').AutocompleteInteraction} interaction
	 * @param {import('../commands/DiscordCommand')} command
	 * @param {string} value
	 */
	async run() { }
};
