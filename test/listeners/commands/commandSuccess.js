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
		if (ctx.interaction) console.log(`${command.type}:${command.name} command executed successfully by ${ctx.interaction.user.tag}`);
		else console.log(`${command.type}:${command.name} command executed successfully by console`);
	}
};