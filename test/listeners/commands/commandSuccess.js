const { Listener } = require('../../../src');

module.exports = class CommandSuccessListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'commandSuccess',
			id: 'commandSuccess',
		});
	}

	/**
	 * @param {import('../../../src').Component} command
	 * @param {*} ctx
	 */
	async run(command, ctx) {
		console.log(`${command.type}:${command.name} command executed successfully`);
	}
};