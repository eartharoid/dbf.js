/**
 * @typedef ComponentOptions
 * @property {string} id The unique internal ID of the component
 * @property {string} moduleName The name of the module this component belongs to
 */

const { TypeError } = require('./errors');

module.exports = class Component {
	/**
	 * Create a new component
	 * @param {import('./Client')} client
	 * @param {ComponentOptions} options
	 */
	constructor(client, options) {
		/** @type {import('./Client')} */
		this.client = client;

		/**
		 * The unique internal ID of the component
		 * @type {string}
		 */
		this.id = options.id;
		if (!this.id || typeof this.id !== 'string') throw new TypeError('InvalidType', 'id', 'string', typeof this.id);

		/**
		 * The module that this component belongs to
		 * @type {import('./Module')}
		 */
		this.mod = this.client.mods.get(options.moduleName);
		if (!this.mod) throw new TypeError('ComponentNoMod', this.id, options.moduleName);

		/**
		 * The filepath of the component
		 * @type {string}
		 */
		this.filepath = null;
	}

	/** Reload the component */
	reload() {
		return this.mod.reload(this.id);
	}

	toString() {
		return this.id;
	}

	/** Unload the component */
	unload() {
		return this.mod.unload(this.id);
	}
};