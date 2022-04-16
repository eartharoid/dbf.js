const { MenuCommand } = require('../../../src');

module.exports = class HelloCommand extends MenuCommand {
	constructor(client) {
		super(client, {
			description: 'Say hello',
			id: 'messageHello',
			name: 'Say hello',
			type: 'message',
		});
	}

	/**
	 * @param {import('discord.js').ContextMenuInteraction} interaction
	 */
	async run(interaction) {
		const message = interaction.options.getMessage('message', true);
		await interaction.reply(`${message.author.toString()}, ${interaction.user.toString()} says hi!`);
	}
};