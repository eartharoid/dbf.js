const Condition = require('../Condition');

module.exports = class ChannelsCondition extends Condition {
	constructor(client) {
		super(client, {
			id: 'channels',
			name: 'channels',
			priority: 10,
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
		const channelType = interactionOrMessage.channel.type;
		return command.channels === 'all'
			? true : command.channels === 'guild' && channelType !== 'DM'
				? command.channels === 'dm' && channelType === 'DM' : false;
	}
};