const Condition = require('../Condition');

module.exports = class MemberPermissionsCondition extends Condition {
	constructor(member) {
		super(member, {
			id: 'memberPermissions',
			name: 'memberPermissions',
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
		if (command.memberPermissions.length === 0) return true;
		const memberPermissions = interactionOrMessage.member.permissionsIn(interactionOrMessage.channel);
		return !memberPermissions.has(command.memberPermissions);
	}
};