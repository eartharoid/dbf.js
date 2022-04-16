const { SlashCommand } = require('../../../src');

module.exports = class PingCommand extends SlashCommand {
	constructor(client) {
		super(client, {
			description: 'Ping pong',
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