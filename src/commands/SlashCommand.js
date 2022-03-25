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
 * @typedef SlashCommandOptions
 * @property {string} name The name of the command
 * @property {Object.<string, string>} [i18nName] The localised name of the command
 * @property {string} description The description of the command
 * @property {Object.<string, string>} [i18nDescription] The localised description of the command
 * @property {CommandOption} options
 * @property {boolean} [default_permission] Enabled by default?
 */
module.exports = class SlashCommand {
	/**
	 * Create a new slash command
	 * @param {import('../Client')} client
	 * @param {SlashCommandOptions} options
	 */
	constructor(client, options) {
		this.client = client;
		this.name = options.name;
	}

	/**
	 * @abstract
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	async run() {}

	toJSON() {
		return {};
	}

	static get OptionTypes() {
		return {
			SUB_COMMAND: 1,
			SUB_COMMAND_GROUP: 2,
			STRING: 3,
			INTEGER: 4,
			BOOLEAN: 5,
			USER: 6,
			CHANNEL: 7,
			ROLE: 8,
			MENTIONABLE: 9,
			NUMBER: 10,
			ATTACHMENT: 11,
		};
	}

	static get ChannelTypes() {
		return {
			GUILD_TEXT: 0,
			DM: 1,
			GUILD_VOICE: 2,
			GROUP_DM: 3,
			GUILD_CATEGORY: 4,
			GUILD_NEWS: 5,
			GUILD_STORE: 6,
			GUILD_NEWS_THREAD: 10,
			GUILD_PUBLIC_THREAD: 11,
			GUILD_PRIVATE_THREAD: 12,
			GUILD_STAGE_VOICE: 13,
		};
	}
};