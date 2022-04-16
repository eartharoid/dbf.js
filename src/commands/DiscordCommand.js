const Component = require('../Component');
const { TypeError } = require('../errors');

module.exports = class DiscordCommand extends Component {
	/**
	 * Create a new Discord command
	 * @param {import('../Client')} client
	 * @param {DiscordCommandComponentOptions} options
	 */
	constructor(client, options) {
		super(client, {
			id: options.id,
			moduleName: 'commands',
		});

		/**
		 * The name of the command
		 * @type {string}
		 */
		this.name = options.name;
		if (!this.name || typeof this.name !== 'string') throw new TypeError('F_INVALID_TYPE', 'name', 'string', typeof this.name);

		/**
		 * The localised name of the command
		 * @type {Object.<string, string>}
		 */
		this.i18nName = options.i18nName;

		/**
		 * The description of the command
		 * @type {string}
		 */
		this.description = options.description;
		if (!this.name || typeof this.name !== 'string') throw new TypeError('F_INVALID_TYPE', 'name', 'string', typeof this.name);

		/**
		 * The localised description of the command
		 * @type {Object.<string, string>}
		 */
		this.i18nDescription = options.i18nDescription;

		/**
		 * Array of permissions the client requires to successfully execute the command
		 * @type {string[]}
		 */
		this.clientPermissions = options.clientPermissions ?? [];

		/**
		 * Array of permissions a member requires to use the command
		 * @type {string[]}
		 */
		this.memberPermissions = options.memberPermissions ?? [];

		/**
		 * The type of channel the command can be used in
		 * @type {string}
		 */
		this.channels = options.channels?.toLowerCase() ?? 'all';
	}
};

/**
 * @typedef DiscordCommandOptions
 * @property {string} name The name of the command
 * @property {Object.<string, string>} [i18nName] The localised name of the command
 * @property {string} description The description of the command
 * @property {Object.<string, string>} [i18nDescription] The localised description of the command
 * @property {string[]} [clientPermissions] Array of permissions the client requires to successfully execute the command
 * @property {string[]} [memberPermissions] Array of permissions a member requires to use the command
 * @property {string} [channels] Allow command to be used in `guild`, `dm`, or `all` channels?
 *
 * @typedef {DiscordCommandOptions & import('../Component').ComponentOptions} DiscordCommandComponentOptions
 */