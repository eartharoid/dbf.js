/**
 * @typedef FrameworkOptions
 * @property {string} [baseDir] Defaults to `./src` if it exists, `./` if it does not
 */

const {
	Client: DiscordClient,
	Collection,
} = require('discord.js');
const fs = require('fs');
const CommandsModule = require('./commands/CommandsModule');
const ListenersModule= require('./listeners/ListenersModule');


/**
 * The Discord client
 * @class Client
 */
module.exports = class Client extends DiscordClient {
	/**
	 * @param {import('discord.js').ClientOptions} discordOptions Options to be passed through to the discord.js Client
	 * @param {FrameworkOptions} [frameworkOptions] Options for the framework
	 */
	constructor(discordOptions, frameworkOptions) {
		super(discordOptions);

		/**
		 * The path relative to the CWD (or absolute) where modules will look for files
		 * @type string
		 */
		this.baseDir = frameworkOptions?.baseDir ?? (fs.existsSync('./src') ? './src' : './');

		/**
		 * Modules
		 * @type {Collection<string, import('./Module')}
		 */
		this.mods = new Collection();

		// this.conditions =
		// this.autocomplete =
		this.commands = new CommandsModule(this);
		this.listeners = new ListenersModule(this); // must be initialised last

		this.listeners.loadAll(); // must be loaded first
		// this.conditions.loadAll();
		// this.autocomplete.loadAll();
		this.commands.loadAll();

	}
};