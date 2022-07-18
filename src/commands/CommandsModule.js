const Module = require('../Module');
const {
	Collection,
	InteractionType: { ApplicationCommand },
} = require('discord.js');
const { Error } = require('../errors');
const readline = require('readline');
const { relative } = require('path');

/**
 * @class CommandsModule
 * @fires CommandsModule#commandError
 * @fires CommandsModule#commandRun
 * @fires CommandsModule#commandSuccess
 */
module.exports = class CommandsModule extends Module {
	constructor(client) {
		super(client, 'commands');

		/**
		 * All loaded commands
		 * @type {Commands}
		 */
		this.commands = {
			message: new Collection(),
			slash: new Collection(),
			stdin: new Collection(),
			text: new Collection(),
			user: new Collection(),
		};

		/** @type {readline.Interface} */
		this.std = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.std.on('line', input => this.handleStdin(input));
		this.client.on('interactionCreate', interaction => this.handleInteraction(interaction));
		this.client.on('messageCreate', message => this.handleMessage(message));

	}

	/**
	 * Handle an interaction
	 * @param {import('discord.js').Interaction} interaction
	 */
	async handleInteraction(interaction) {
		if (interaction.type !== ApplicationCommand) return;
		const type = interaction.isChatInputCommand()
			? 'slash' : interaction.isMessageContextMenuCommand()
				? 'message' : interaction.isUserContextMenuCommand()
					? 'user' : null;
		if (!type) return false;
		const command = this.client.commands.components.find(c => c.type === type && c.name === interaction.commandName);
		if (command) {
			try {
				const passed = await this.client.conditions.tryInteraction(interaction, command);
				if (!passed) return false; // check permissions and other conditions
				this.emit('commandRun', command, { interaction });
				await command.run(interaction);
				this.emit('commandSuccess', command, { interaction });
			} catch (error) {
				this.emit('commandError', command, {
					error,
					interaction,
				});
			}
		} else {
			this.emit('commandAttempt', type, 'EXISTENCE', { commandName: interaction.commandName });
		}
	}

	/**
	 * Handle a message
	 * @param {import('discord.js').Message} message
	 */
	async handleMessage(message) {
		const prefix = (typeof this.client.prefix === 'function' ? await this.client.prefix(message) : this.client.prefix)
			.replace(/(?=\W)/g, '\\'); // escaped
		const match = message.content.match(new RegExp(`^(${prefix}|<@!?${this.client.user.id}>\\s?)(\\S+)`, 'mi')); // prefix and command name
		if (!match) return false; // not a command
		const args = message.content.replace(match[0], '').trim(); // remove the prefix and command
		const commandName = match[2].toLowerCase(); // remove the prefix from the command name
		if (this.commands.text.has(commandName)) {
			const command = this.commands.text.get(commandName);
			try {
				const passed = await this.client.conditions.tryMessage(message, command);
				if (!passed) return false; // check permissions and other conditions
				this.emit('commandRun', command, { message });
				await command.run(message, args);
				this.emit('commandSuccess', command, { message });
			} catch (error) {
				this.emit('commandError', command, {
					error,
					message,
				});
			}
		} else {
			this.emit('commandAttempt', 'text', 'EXISTENCE', { commandName });
		}
	}

	/**
	 * Handle a stdin line
	 * @param {string} input
	 */
	async handleStdin(input) {
		const args = input.split(/\s/g);
		const commandName = args.shift().toLowerCase();
		if (this.commands.stdin.has(commandName)) {
			const command = this.commands.stdin.get(commandName);
			try {
				this.emit('commandRun', command, { args });
				await command.run(args);
				this.emit('commandSuccess', command, { args });
			} catch (error) {
				this.emit('commandError', command, { error });
			}
		} else {
			this.emit('commandAttempt', 'stdin', 'EXISTENCE', { commandName });
		}
	}

	/**
	 * Load a command
	 * @param {string} filepath The filepath of the command
	 * @param {boolean} reload Has the component already been loaded?
	 */
	load(filepath, reload) {
		const Command = require(filepath);
		/** @type {import('../Component')} */
		const command = new Command(this.client);
		command.filepath = filepath;
		if (!reload && this.components.has(command.id)) throw new Error('ComponentAlreadyLoaded', command.id, this.name);
		const rel = relative(this.client.baseDir, filepath);
		const parts = rel.split(/\//g);
		let type = parts[1];
		if (type === 'menu') type = command.type;
		if (!Object.keys(this.commands).includes(type)) throw new Error('InvalidCommandType', type);
		this.components.set(command.id, command);
		this.commands[type].set(command.name, command);
		this.emit('componentLoad', command, reload ?? false);
	}

	/** Publish the application (interaction) commands to Discord */
	async publish() {
		// const fetched = await this.client.application.commands.fetch();
		// for (const [, command] of fetched) await command.delete();
		const commands = this.components
			.filter(c => ['message', 'slash', 'user'].includes(c.type))
			.map(c => c.toJSON());
		return this.client.application.commands.set(commands);
	}
};

/**
 * @typedef Commands
 * @property {Collection<string, import('./MenuCommand')>} message
 * @property {Collection<string, import('./SlashCommand')>} slash
 * @property {Collection<string, import('./StdinCommand')>} stdin
 * @property {Collection<string, import('./TextCommand')>} text
 * @property {Collection<string, import('./MenuCommand')>} user
 */

/**
 * Emitted when a command throws an error
 * @event CommandsModule#commandError
 * @param {Component} command The command
 * @param {object} context
 * @param {Error} context.error The error
 * @param {Message} [context.message] Present when `command.type` is `text`
 * @param {Interaction} [context.interaction] Present when `command.type` is `slash`, `message`, or `user`
 */

/**
 * Emitted when a command is executed
 * @event CommandsModule#commandRun
 * @param {Component} command The command
 * @param {object} context
 * @param {string[]} [context.args] Present when `command.type` is `text` or `stdin`
 * @param {Message} [context.message] Present when `command.type` is `text`
 * @param {Interaction} [context.interaction] Present when `command.type` is `slash`, `message`, or `user`
 */

/**
 * Emitted when a command finishes execution successfully
 * @event CommandsModule#commandSuccess
 * @param {Component} command The command
 * @param {object} context
 * @param {string[]} [context.args] Present when `command.type` is `text` or `stdin`
 * @param {Message} [context.message] Present when `command.type` is `text`
 * @param {Interaction} [context.interaction] Present when `command.type` is `slash`, `message`, or `user`
 */
