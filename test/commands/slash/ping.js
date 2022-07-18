const { SlashCommand } = require('../../../src');

module.exports = class PingCommand extends SlashCommand {
	constructor(client) {
		super(client, {
			description: 'Ping pong',
			i18nDescription: { 'en-GB': 'British ping pong' },
			i18nName: { 'en-GB': 'british-ping' },
			id: 'slashPing',
			name: 'ping',
		});
	}

	/**
	 * @param {import('discord.js').CommandInteraction} interaction
	 */
	async run(interaction) {
		await interaction.reply(':ping_pong: Pong!');
	}
};