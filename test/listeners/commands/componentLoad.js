const { Listener } = require('../../../src');

module.exports = class CommandComponentLoadListener extends Listener {
	constructor(client){
		super(client, {
			emitter: client.commands,
			event: 'componentLoad',
			id: 'commandComponentLoad',
		});
	}

	/**
	 * @param {import('../../../src').Component} command
	 */
	async run(command) {
		console.log(`${command} (${command.type}:${command.name}) command loaded`);
	}
};