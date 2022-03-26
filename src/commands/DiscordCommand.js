/**
 * @typedef DiscordCommandOptions
 * @property {string} name The name of the command
 * @property {Object.<string, string>} [i18nName] The localised name of the command
 * @property {string} description The description of the command
 * @property {Object.<string, string>} [i18nDescription] The localised description of the command
 * @property {string[]} [clientPermissions] Array of permissions the client requires to successfully execute the command
 * @property {string[]} [memberPermissions] Array of permissions a member requires to use the command
 *
 * @typedef {DiscordCommandOptions & import('../Component').ComponentOptions} DiscordCommandComponentOptions
 */

const Component = require('../Component');

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
	}
};