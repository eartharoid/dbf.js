const DiscordCommand = require('./DiscordCommand');
/**
 * @typedef {Object} MenuCommandOptions
 * @property {string} type `message` or `user`
 * @property {boolean} [defaultPermission] Enabled by default?
 *
 * @typedef {(import('./DiscordCommand').DiscordCommandOptions) & MenuCommandOptions} DiscordMenuCommandOptions
 */
module.exports = class MenuCommand extends DiscordCommand{
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {DiscordMenuCommandOptions} options
	 */
	constructor(client, options) {
		super(client, options);
		this.type = options.type;
	}

	/**
	 * @abstract
	 * @param {(import('discord.js").MessageContextMenuInteraction)|(import("discord').UserContextMenuInteraction)} interaction
	 */
	async run() { }

	toJSON() {
		return {};
	}
};