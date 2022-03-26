const EventEmitter = require('events');
const { Collection } = require('discord.js');
const { resolve } = require('path');
const { files: readDir } = require('node-dir');
const { Error } = require('./errors');

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
		const files = readDir(moduleDir, { sync: true });
		return files.filter(file => file.endsWith('.js'));
	}

	/**
	 * Load a component
	 * @abstract
	 * @param {import('./Component')} component The component to load
	 * @param {string} file The filepath of the component
	 */
	load(component, file) {
		if (this.components.has(component.id)) throw new Error('F_COMPONENT_ALREADY_LOADED', component.id, this.name);
		component.filepath = file;
		this.components.set(component.id, component);
		this.emit('componentLoad', component);
		return true;
	}

	/** Load all files */
	loadAll() {
		const files = this.listFiles();
		for (const file of files) {
			try {
				const Component = require(file);
				const component = new Component(this.client);
				this.load(component, file);
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
		let component = this.components.get(id);
		const filepath = component.filepath;
		delete require.cache[filepath];
		const Component = require(filepath);
		component = new Component(this.client);
		this.load(component, filepath);
		this.emit('componentReload', component);
		return true;
	}

	toString() {
		return this.name;
	}

	/**
	 * Unload a component
	 * @param {string} id The ID of the component to unload
	 */
	unload(id) {
		if (!this.components.has(id)) throw new Error('F_UNKNOWN_COMPONENT', id, this.name);
		const component = this.components.get(id);
		delete require.cache[component.filepath];
		this.components.delete(id);
		this.emit('componentUnload', id);
		return true;
	}

};