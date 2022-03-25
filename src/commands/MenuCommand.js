/**
 * @typedef MenuCommandOptions
 * @property {string} type `message` or `user`
 * @property {string} name The name of the command
 * @property {Object.<string, string>} [i18nName] The localised name of the command
 * @property {string} description The description of the command
 * @property {Object.<string, string>} [i18nDescription] The localised description of the command
 * @property {boolean} [default_permission] Enabled by default?
 */
module.exports = class MenuCommand {
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {MenuCommandOptions} options
	 */
	constructor(client, options) {
		this.client = client;
		this.type = options.type;
		this.name = options.name;
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