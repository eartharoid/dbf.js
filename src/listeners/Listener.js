const Component = require('../Component');
const EventEmitter = require('events');
const { TypeError } = require('../errors');

module.exports = class Listener extends Component {
	/**
	 * Create a new listener
	 * @param {import('../Client')} client
	 * @param {ListenerComponentOptions} options
	 */
	constructor(client, options) {
		super(client, {
			id: options.id,
			moduleName: 'listeners',
		});

		/**
		 * The name of the event to listen for
		 * @type {string}
		 */
		this.event = options.event;
		if (!this.event || typeof this.event !== 'string') throw new TypeError('InvalidType', 'event', 'string', typeof this.event);

		/**
		 * The event emitter
		 * @type {import('events')}
		 */
		this.emitter = options.emitter;
		if (!(this.emitter instanceof EventEmitter)) throw new TypeError('InvalidType', 'emitter', 'EventEmitter', typeof this.name);

		/**
		 * `once` or `on`
		 * @type {boolean}
		 */
		this.once = options.once ?? false;
	}

	/** @abstract */
	async run() { }
};

/**
 * @typedef ListenerOptions
 * @property {string} event The name of the event to listen for
 * @property {import('events')} emitter The event emitter
 * @property {boolean} [once] Defaults to `false`
 *
 * @typedef {ListenerOptions & import('../Component').ComponentOptions} ListenerComponentOptions
 */