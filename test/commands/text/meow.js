const { TextCommand } = require('../../../src');

module.exports = class MeowCommand extends TextCommand {
	constructor(client) {
		super(client, {
			id: 'textMeow',
			name: 'meow',
		});
	}

	async run(message) {
		message.reply('meow');
	}
};