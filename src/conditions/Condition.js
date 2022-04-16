const Component = require('../Component');
const { TypeError } = require('../errors');

module.exports = class Condition extends Component {
	/**
	 * Create a new condition
	 * @param {import('../Client')} client
	 * @param {ConditionComponentOptions} options
	 */
	constructor(client, options) {
		super(client, {
			id: options.id,
			moduleName: 'conditions',
		});

		/**
		 * The name of the condition
		 * @type {string}
		 */
		this.name = options.name;
		if (!this.name || typeof this.name !== 'string') throw new TypeError('F_INVALID_TYPE', 'name', 'string', typeof this.name);


		/**
		 * The condition type - `interaction`, `message`, or `both`
		 * @type {string}
		 */
		this.type = options.type;
		if (!this.type || typeof this.type !== 'string') throw new TypeError('F_INVALID_TYPE', 'type', 'string', typeof this.type);
		if (!['interaction', 'message', 'both'].includes(this.type)) throw new RangeError('F_INVALID_CONDITION_TYPE', this.type);

		/**
		 * The priority of the condition
		 * @type {number}
		 * @default 1000
		 */
		this.priority = options.priority ?? 1000;
	}

	/**
	 * @abstract
	 * @param {string} type `message` or `interaction`
	 * @param {Component} command The command to check against
	 * @param {Message|Interaction} interactionOrMessage The message or interaction
	 * @returns {boolean} `false` is failed, `true` if passed
	 */
	async run() { }
};

/**
 * @typedef ConditionOptions
 * @property {string} name The name of the condition, so you know which condition failed
 * @property {string} type `interaction`, `message`, or `both`
 * @property {number} [priority] Higher priority **(lower number)** conditions are checked first
 *
 * @typedef {ConditionOptions & import('../Component').ComponentOptions} ConditionComponentOptions
 */