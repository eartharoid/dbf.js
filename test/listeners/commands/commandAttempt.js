const { Listener } = require('../../../src');

module.exports = class CommandAttemptListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.commands,
			event: 'commandAttempt',
			id: 'commandAttempt',
		});
	}

	/**
	 * @param {string} type
	 * @param {string} reason
	 * @param {*} ctx
	 */
	async run(type, reason, ctx) {
		if (reason === 'EXISTENCE') console.log(`Attempt to use ${type} command that doesn't exist: ${ctx.commandName}`);
	}
};