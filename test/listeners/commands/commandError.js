const { Listener } = require('../../../src');

module.exports = class CommandErrorListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'commandError',
			id: 'commandError',
		});
	}

	/**
	 * @param {import('../../../src').Component} command
	 * @param {*} ctx
	 */
	async run(command, ctx) {
		console.log(`${command.type}:${command.name} command encountered an error`, ctx);
	}
};