const EventEmitter = require('events');
const { Collection } = require('discord.js');
const { resolve } = require('path');
const { files: readDir } = require('node-dir');
const { Error } = require('./errors');

/**
 * @class Module
 * @fires Module#componentLoad
 * @fires Module#componentReload
 * @fires Module#componentUnload
 * @fires Module#error
 */
module.exports = class Module extends EventEmitter {
	/**
	 * @param {import('./Client')} client
	 * @param {string} name The module (and directory) name
	 */
	constructor(client, name) {
		super();

		/** @type {import('./Client')} */
		this.client = client;

		/**
		 * The module (and directory) name
		 * @type {string}
		 */
		this.name = name;

		this.client.mods.set(name, this);

		/** @type {Collection<string, Component>} */
		this.components = new Collection();
	}

	/** List files in the module directory */
	listFiles() {
		const moduleDir = resolve(this.client.baseDir, this.name);
		const files = readDir(moduleDir, { sync: true }) ?? [];
		return files.filter(file => file.endsWith('.js'));
	}

	/**
	 * Load a component
	 * @abstract
	 * @param {string} filepath The filepath of the component
	 * @param {boolean} reload Has the component already been loaded?
	 */
	load(filepath, reload) {
		const Component = require(filepath);
		const component = new Component(this.client);
		component.filepath = filepath;
		if (!reload && this.components.has(component.id)) throw new Error('F_COMPONENT_ALREADY_LOADED', component.id, this.name);
		this.components.set(component.id, component);
		this.emit('componentLoad', component, reload ?? false);
		return true;
	}

	/** Load all files */
	loadAll() {
		const files = this.listFiles();
		for (const file of files) {
			try {
				this.load(file);
			} catch (error) {
				this.emit('error', new Error('F_MOD_LOADING_ERROR', this.name, error));
			}
		}
	}

	/**
	 * Reload a component
	 * @param {string} id The ID of the component to reload
	 */
	reload(id) {
		if (!this.components.has(id)) throw new Error('F_UNKNOWN_COMPONENT', id, this.name);
		const filepath = this.components.get(id).filepath;
		this.unload(id, true);
		this.load(filepath, true);
		this.emit('componentReload', id);
		return true;
	}

	toString() {
		return this.name;
	}

	/**
	 * Unload a component
	 * @param {string} id The ID of the component to unload
	 * @param {boolean} reload Is the component about to be loaded again?
	 */
	unload(id, reload) {
		if (!this.components.has(id)) throw new Error('F_UNKNOWN_COMPONENT', id, this.name);
		const component = this.components.get(id);
		delete require.cache[component.filepath];
		// don't fully unload (using unload method) as removing it from `this.components` could cause an infinite loop
		if (!reload) this.components.delete(id);
		this.emit('componentUnload', id, reload ?? false);
		return true;
	}

};

/**
 * Emitted when the module loads a {@link Component}
 * @event Module#componentLoad
 * @param {Component} component The component loaded
 * @param {boolean} reload If the component has just been reloaded
 */

/**
 * Emitted when the module reloads a component
 * @event Module#componentReload
 * @param {string} componentId The ID of component reloaded
 */

/**
 * Emitted when the module unloads a component
 * @event Module#componentUnload
 * @param {string} componentId The ID of component unloaded
 * @param {boolean} reload If the component is in the process of being reloaded
 */

/**
 * Emitted when a critical error occurs.
 * Most errors are thrown to be handled by the user, however component loading is done automatically and the user cannot catch any errors,
 * so they are emitted as events (`F_MOD_LOADING_ERROR`).
 * @event Module#error
 * @param {Error} error The error
 */