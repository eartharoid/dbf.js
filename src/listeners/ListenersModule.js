const Module = require('../Module');
const { Error } = require('../errors');

module.exports = class ListenersModule extends Module {
	constructor(client) {
		super(client, 'listeners');
	}

	/**
	 * Load a listener
	 * @param {string} filepath The filepath of the listener
	 * @param {boolean} reload Has the component already been loaded?
	 */
	load(filepath, reload) {
		const Listener = require(filepath);
		/** @type {import('./Listener')} */
		const listener = new Listener(this.client);
		listener.filepath = filepath;
		if (!reload && this.components.has(listener.id)) throw new Error('F_COMPONENT_ALREADY_LOADED', listener.id, this.name);
		listener._run = (...args) => listener.run(...args);
		listener.emitter[listener.once ? 'once' : 'on'](listener.event, listener._run);
		this.components.set(listener.id, listener);
		this.emit('componentLoad', listener, reload ?? false);
		return true;
	}

	/**
	 * Unload a listener
	 * @param {string} id The ID of the listener to unload
	 * @param {boolean} reload Is the listener about to be loaded again?
	 */
	unload(id, reload) {
		if (!this.components.has(id)) throw new Error('F_UNKNOWN_COMPONENT', id, this.name);
		/** @type {import('./Listener')} */
		const listener = this.components.get(id);
		listener.emitter.off(listener.event, listener._run); // remove the listener from the EventEmitter
		delete require.cache[listener.filepath];
		if (!reload) this.components.delete(id);
		this.emit('componentUnload', id, reload ?? false);
		return true;
	}


};