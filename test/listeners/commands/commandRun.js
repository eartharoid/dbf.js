const { Listener } = require('../../../src');

module.exports = class CommandRunListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'commandRun',
			id: 'commandRun',
		});
	}

	/**
	 * @param {import('../../../src').Component} command
	 * @param {*} ctx
	 */
	async run(command, ctx) {
		console.log(`${command.type}:${command.name} command used`);
	}
};