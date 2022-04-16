const {
	Client: DiscordClient,
	Collection,
} = require('discord.js');
const fs = require('fs');

const ConditionsModule = require('./conditions/ConditionsModule');
const CommandsModule = require('./commands/CommandsModule');
const ListenersModule = require('./listeners/ListenersModule');


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
		 * The prefix string or function
		 * @type {string|function}
		 */
		this.prefix = frameworkOptions?.prefix ?? '!';

		/**
		 * Modules
		 * @type {Collection<string, import('./Module')}
		 */
		this.mods = new Collection();

		this.conditions = new ConditionsModule(this);
		// this.autocomplete =
		this.commands = new CommandsModule(this);
		this.listeners = new ListenersModule(this); // must be initialised last

		this.listeners.loadAll(); // must be loaded first
		this.conditions.loadAll();
		// this.autocomplete.loadAll();
		this.commands.loadAll();
	}
};

/**
 * @typedef FrameworkOptions
 * @property {string} [baseDir] Defaults to `./src` if it exists, `./` if it does not
 * @property {string|function} [prefix] Defaults to `!`, `@ClientUser` also works. Function should return a `Promise<string>`
 */