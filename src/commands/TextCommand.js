/**
 * @typedef TextCommandOptions
 * @property {string} name The name of the command
 */
module.exports = class MenuCommand {
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {TextCommandOptions} options
	 */
	constructor(client, options) {
		this.client = client;
		this.name = options.name;
	}

	/**
	 * @abstract
	 * @param {string[]} args
	 */
	async run() { }
};