/* eslint-disable sort-keys */

const DiscordCommand = require('./DiscordCommand');

module.exports = class SlashCommand extends DiscordCommand {
	/**
	 * Create a new slash command
	 * @param {import('../Client')} client
	 * @param {DiscordSlashCommandOptions} options
	 */
	constructor(client, options) {
		super(client, options);

		/** @type {string} */
		this.type = 'slash';

		/**
		 * Enabled by default?
		 * @type {boolean}
		 */
		this.defaultPermission = options.defaultPermission ?? true;

		/** @type {CommandOption[]} */
		this.options = options.options;
	}

	/**
	 * @abstract
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	async run() {}

	toJSON() {
		return {
			defaultPermission: this.defaultPermission,
			description: this.description,
			i18nDescription: this.i18nDescription,
			i18nName: this.i18nName,
			name: this.name,
			options: this.options,
		};
	}
};

/**
 * A command option choice
 * @typedef OptionChoice
 * @property {string} name The name of the choice (displayed to user)
 * @property {Object.<string, string>} [i18nName] The localised name of the choice (displayed to user)
 * @property {string|number} value The value returned by Discord
 */
/**
 * A command option
 * @typedef CommandOption
 * @property {number} type The option's type (use `Command.option_types`)
 * @property {string} name The name of the option
 * @property {Object.<string, string>} [i18nName] The localised name of the option
 * @property {string} description The description of the option
 * @property {Object.<string, string>} [i18nDescription] The localised description of the option
 * @property {CommandOption[]} [options] The option's options
 * @property {OptionChoice[]} [choices] The option's choices
 * @property {boolean} [required] Defaults to `false`
 * @property {number[]} [channelTypes] Types of channels to be allowed
 * @property {number} [minValue] Minimum value allowed
 * @property {number} [maxValue] Maximum value allowed
 * @property {boolean} [autocomplete] Enable autocomplete? (`false`)
 */

/**
 * @typedef {Object} SlashCommandOptions
 * @property {CommandOption} options Chat command options
 * @property {boolean} [defaultPermission] Enabled by default?
 *
 * @typedef {(import('./DiscordCommand').DiscordCommandOptions) & SlashCommandOptions} DiscordSlashCommandOptions
 */