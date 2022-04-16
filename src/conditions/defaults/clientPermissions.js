const Condition = require('../Condition');

module.exports = class ClientPermissionsCondition extends Condition {
	constructor(client) {
		super(client, {
			id: 'clientPermissions',
			name: 'clientPermissions',
			priority: 30,
			type: 'both',
		});
	}

	/**
	 *
	 * @param {string} type
	 * @param {import('../../commands/DiscordCommand')} command
	 * @param {import('discord.js').Message} interactionOrMessage
	 */
	async run(type, command, interactionOrMessage) {
		if (!interactionOrMessage.guild) return true;
		const clientPermissions = interactionOrMessage.guild.me.permissionsIn(interactionOrMessage.channel);
		return !clientPermissions.has(command.clientPermissions);
	}
};