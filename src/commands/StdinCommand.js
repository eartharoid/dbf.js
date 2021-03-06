const Component = require('../Component');
const { TypeError } = require('../errors');

module.exports = class StdinCommand extends Component {
	/**
	 * Create a new menu command
	 * @param {import('../Client')} client
	 * @param {StdinCommandComponentOptions} options
	 */
	constructor(client, options) {
		super(client, {
			id: options.id,
			moduleName: 'commands',
		});

		/** @type {string} */
		this.type = 'stdin';

		/**
		 * The name of the command
		 * @type {string}
		 */
		this.name = options.name;
		if (!this.name || typeof this.name !== 'string') throw new TypeError('InvalidType', 'name', 'string', typeof this.name);
	}

	/**
	 * @abstract
	 * @param {string[]} args
	 */
	async run() { }
};

/**
 * @typedef StdinCommandOptions
 * @property {string} name The name of the command
 *
 * @typedef {StdinCommandOptions & import('../Component').ComponentOptions} StdinCommandComponentOptions
 */
