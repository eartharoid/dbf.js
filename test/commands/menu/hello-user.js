const { MenuCommand } = require('../../../src');

module.exports = class HelloCommand extends MenuCommand {
	constructor(client) {
		super(client, {
			description: 'Say hello to this user',
			id: 'messageHello',
			name: 'Say hello',
			type: 'user',
		});
	}

	/**
	 * @param {import('discord.js').ContextMenuInteraction} interaction
	 */
	async run(interaction) {
		const user = interaction.options.getUser('user', true);
		await interaction.reply(`${user.toString()}, ${interaction.user.toString()} says hi!`);
	}
};