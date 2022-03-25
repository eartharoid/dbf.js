const Module = require('../Module');
const { Collection } = require('discord.js');
const { Error } = require('../errors');
const readline = require('readline');

/**
 * @typedef Commands
 * @property {Collection<string, import('./MenuCommand')>} menu
 * @property {Collection<string, import('./SlashCommand')>} slash
 * @property {Collection<string, import('./StdinCommand')>} stdin
 * @property {Collection<string, import('./TextCommand')>} text
 */

module.exports = class CommandsModule extends Module {
	constructor(client) {
		super(client, 'commands');

		this.client.on('interactionCreate', this.handleInteraction);

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

		this.std.on('line', async input => {
			const args = input.split(/\s/g);
			const commandName = args.shift().toLowerCase();
			if (this.commands.stdin.has(commandName)) {
				const command = this.commands.stdin.get(commandName);
				try {
					await command.run(args);
					this.emit('commandSuccess', 'stdin', command, { args });
				} catch (error) {
					this.emit('commandError', 'stdin', command, { error });
				}
			} else {
				this.emit('commandAttempt', 'stdin', 'EXISTENCE',  { commandName });
			}

		});
	}

	/**
	 * Handle an interaction
	 * @param {import('discord.js').Interaction} interaction
	 */
	async handleInteraction(interaction) {
		if (interaction.isCommand()) {
			//
		} else if (interaction.isMessageContextMenu()) {
			//
		} else if (interaction.isUserContextMenu()) {
			//
		}
	}

	async load() {
		const files = await this.readDir();
		for (const file of files) {
			try {
				const parts = file.split(/\//g);
				const Command = require(file);
				const command = new Command(this.client);
				let type = parts[parts.length - 2];
				if (type === 'menu') type = command.type;
				if (!Object.keys(this.commands).includes(type)) return this.emit('error', new Error('F_INVALID_COMMAND_TYPE', type));
				this.commands[type].set(command.name, command);
				this.emit('load', command);
			} catch (error) {
				this.emit('error', new Error('F_MOD_LOADING_ERROR', this.name, error.message ?? error));
			}
		}
	}
};