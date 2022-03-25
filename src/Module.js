const EventEmitter = require('events');
const { resolve } = require('path');
const { promiseFiles } = require('node-dir');

module.exports = class Module extends EventEmitter {
	/**
	 * @param {import('./Client')} client
	 * @param {string} name Module (and directory) name
	 */
	constructor(client, name) {
		super();

		this.client = client;
		this.name = name;

		this.client.mods.set(name, this);
		this.load();
	}

	/**
	 * @abstract
	 */
	async load() {}

	/** List files in the module directory */
	async readDir() {
		const moduleDir = resolve(this.client.baseDir, this.name);
		return await promiseFiles(moduleDir);
	}

};