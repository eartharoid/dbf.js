const { SlashCommand } = require('../../../src');

module.exports = class PingCommand extends SlashCommand {
	constructor(client) {
		super(client, {
			description: 'Ping pong',
			descriptionLocalizations: { 'en-GB': 'British ping pong' },
			nameLocalizations: { 'en-GB': 'british-ping' },
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