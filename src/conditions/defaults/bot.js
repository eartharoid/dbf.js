const Condition = require('../Condition');

module.exports = class BotCondition extends Condition {
	constructor(client) {
		super(client, {
			id: 'bot',
			name: 'bot',
			priority: 10,
			type: 'message',
		});
	}

	/**
	 *
	 * @param {string} type
	 * @param {import('../../commands/DiscordCommand')} command
	 * @param {import('discord.js').Message} message
	 */
	async run(type, command, message) {
		return !message.author.bot;
	}
};