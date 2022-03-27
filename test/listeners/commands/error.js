const { Listener } = require('../../../src');

module.exports = class CommandModuleErrorListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'error',
			id: 'commandModError',
		});
	}

	/**
	 * @param {*} error
	 */
	async run(error) {
		console.error('ERROR[COMMANDS]', error);
	}
};