/**
 * @typedef DiscordCommandOptions
 * @property {string} name The name of the command
 * @property {Object.<string, string>} [i18nName] The localised name of the command
 * @property {string} description The description of the command
 * @property {Object.<string, string>} [i18nDescription] The localised description of the command
 * @property {boolean} [defaultPermission] Enabled by default?
 * @property {string[]} [clientPermissions] Array of permissions the client requires to successfully execute the command
 * @property {string[]} [memberPermissions] Array of permissions a member requires to use the command
 */
module.exports = class DiscordCommand {
	/**
	 * Create a new Discord command
	 * @param {import('../Client')} client
	 * @param {DiscordCommandOptions} options
	 */
	constructor(client, options) {
		this.client = client;
		this.name = options.name;
	}
};