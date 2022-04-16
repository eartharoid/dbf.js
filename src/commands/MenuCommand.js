const DiscordCommand = require('./DiscordCommand');

module.exports = class MenuCommand extends DiscordCommand {
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {DiscordMenuCommandOptions} options
	 */
	constructor(client, options) {
		super(client, options);

		/**
		 * `message` or `user`
		 * @type {string}
		 */
		this.type = options.type;

		/**
		 * Enabled by default?
		 * @type {boolean}
		 */
		this.defaultPermission = options.defaultPermission ?? true;
	}

	/**
	 * @abstract
	 * @param {(import('discord.js").MessageContextMenuInteraction)|(import("discord').UserContextMenuInteraction)} interaction
	 */
	async run() { }

	toJSON() {
		return {
			defaultPermission: this.defaultPermission,
			description: this.description,
			i18nDescription: this.i18nDescription,
			i18nName: this.i18nName,
			name: this.name,
		};
	}
};

/**
 * @typedef {Object} MenuCommandOptions
 * @property {string} type `message` or `user`
 * @property {boolean} [defaultPermission] Enabled by default?
 *
 * @typedef {(import('./DiscordCommand').DiscordCommandOptions) & MenuCommandOptions} DiscordMenuCommandOptions
 */