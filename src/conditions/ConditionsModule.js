const Module = require('../Module');
const { resolve } = require('path');
const { Error } = require('../errors');

/**
 * @class ConditionsModule
 * @fires Module#conditionFail
 * @fires Module#conditionPass
 */
module.exports = class ConditionsModule extends Module {
	constructor(client) {
		super(client, 'conditions');

		const defaults = [
			'defaults/bot.js',
			'defaults/channels.js',
			'defaults/clientPermissions.js',
			'defaults/memberPermissions.js',
		];
		defaults.forEach(file => this.load(resolve(__dirname, file)));
	}

	/**
	 * Filter and sort conditions
	 * @param {string} type The condition type
	 */
	getConditions(type) {
		return this.components
			.filter(c => c.type === type || c.type === 'both')
			.sort((a, b) => a.priority - b.priority);
	}

	/**
	 * Load a condition
	 * @param {string} filepath The filepath of the condition
	 * @param {boolean} reload Has the condition already been loaded?
	 */
	load(filepath, reload) {
		const Condition = require(filepath);
		const condition = new Condition(this.client);
		condition.filepath = filepath;
		if (!reload && this.components.has(condition.id)) throw new Error('F_CONDITION_ALREADY_LOADED', condition.id, this.name);
		this.components.set(condition.id, condition);
		this.sortConditions(); // update the arrays
		this.emit('conditionLoad', condition, reload ?? false);
		return true;
	}

	sortConditions() {
		/** @type {Collection<string, Condition>} */
		this.interactionConditions = this.getConditions('interaction');

		/** @type {Collection<string, Condition>} */
		this.messageConditions = this.getConditions('message');
	}

	/**
	 * @param {string} type `message` or `interaction`
	 * @param {Component} command
	 * @param {import('discord.js').Interaction|Message} interactionOrMessage
	 * @param {Collection<string, Condition>} conditions
	 */
	async try(type, command, interactionOrMessage, conditions) {
		try {
			for (const [, condition] of conditions) {
				const result = await condition.run(type, command, interactionOrMessage);
				const eventContext = { command };
				eventContext[type === 'message' ? 'message' : 'interaction'] = interactionOrMessage;
				if (result === false) {
					this.emit('conditionFail', condition.name, eventContext);
					return false;
				} else {
					this.emit('conditionPass', condition.name, eventContext);
				}
			}
			return true;
		} catch (error) {
			this.emit('conditionError', { error });
			return false;
		}
	}

	/**
	 * Check if an interaction meets all conditions for a command
	 * @param {import('discord.js').Interaction} interaction
	 * @param {Component} command
	 * @return {boolean|*}
	 */
	async tryInteraction(interaction, command) {
		return this.try('interaction', interaction, command, this.interactionConditions);
	}

	/**
	 * Check if a message meets all conditions for a command
	 * @param {Message} message
	 * @param {Component} command
	 * @return {boolean|*}
	 */
	async tryMessage(message, command) {
		return this.try('message', message, command, this.messageConditions);
	}
};

/**
 * Emitted when a condition throws an Error
 * @event ConditionsModule#conditionError
 * @param {string} conditionName The name of condition passed
 * @param {object} context
 * @param {Component} context.command The command
 * @param {*} context.error The error
 * @param {import('discord.js').Interaction} [context.interaction] The interaction
 * @param {Message} [context.message] The message
 */

/**
 * Emitted when a condition returns `false`
 * @event ConditionsModule#conditionFail
 * @param {string} conditionName The name of condition failed
 * @param {object} context
 * @param {Component} context.command The command
 * @param {import('discord.js').Interaction} [context.interaction] The interaction
 * @param {Message} [context.message] The message
 */

/**
 * Emitted when a condition returns anything but `false`
 * @event ConditionsModule#conditionPass
 * @param {string} conditionName The name of condition passed
 * @param {object} context
 * @param {Component} context.command The command
 * @param {import('discord.js').Interaction} [context.interaction] The interaction
 * @param {Message} [context.message] The message
 */