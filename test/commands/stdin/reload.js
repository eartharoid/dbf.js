const { StdinCommand } = require('../../../src');

module.exports = class ReloadCommand extends StdinCommand {
	constructor(client) {
		super(client, {
			id: 'stdinReload',
			name: 'reload',
		});
	}

	async run() {
		const commandsModule = this.client.mods.get('commands');
		commandsModule.components.forEach(value => value.reload());
		console.log(`Reloaded ${commandsModule.components.size} commands`);
	}
};