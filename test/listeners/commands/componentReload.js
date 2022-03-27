const { Listener } = require('../../../src');

module.exports = class CommandComponentReloadListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'componentReload',
			id: 'commandComponentReload',
		});
	}

	/**
	 * @param {string} commandId
	 */
	async run(commandId) {
		console.log(`${commandId} command reloaded`);
	}
};