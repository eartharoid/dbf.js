const { Listener } = require('../../../src');

module.exports = class CommandComponentUnloadListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'componentUnload',
			id: 'commandComponentUnload',
		});
	}

	/**
	 * @param {string} commandId
	 */
	async run(commandId) {
		console.log(`${commandId} command unloaded`);
	}
};