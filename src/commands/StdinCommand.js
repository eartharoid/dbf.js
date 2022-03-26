/**
 * @typedef StdinCommandOptions
 * @property {string} name The name of the command
 *
 * @typedef {StdinCommandOptions & import('../Component').ComponentOptions} StdinCommandComponentOptions
 */

const Component = require('../Component');

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

		/**
		 * The name of the command
		 * @type {string}
		 */
		this.name = options.name;
	}

	/**
	 * @abstract
	 * @param {string[]} args
	 */
	async run() { }
};