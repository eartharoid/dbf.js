const DiscordCommand = require('./DiscordCommand');
const { Error } = require('../errors');
const { ApplicationCommandType } = require('discord.js');

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
		if (this.type !== 'message' && this.type !== 'user') throw new Error('InvalidMenuCommandType', this.id);

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
			i18nName: this.i18nName,
			name: this.name,
			type: this.type === 'message' ? ApplicationCommandType.Message : ApplicationCommandType.User,
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