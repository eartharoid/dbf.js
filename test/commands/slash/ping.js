const { SlashCommand } = require('../../../src');

module.exports = class PingCommand extends SlashCommand {
	constructor(client) {
		super(client, {
			description: 'Ping pong',
			name: 'ping',
		});
	}
};