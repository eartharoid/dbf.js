const DiscordCommand = require('./DiscordCommand');

module.exports = class TextCommand extends DiscordCommand {
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {import('./DiscordCommand').DiscordCommandOptions} options
	 */
	constructor(client, options) {
		super(client, options);

		/** @type {string} */
		this.type = 'text';
	}

	/**
	 * @abstract
	 * @param {string[]} args
	 */
	async run() { }
};