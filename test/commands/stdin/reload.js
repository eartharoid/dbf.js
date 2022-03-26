const { StdinCommand } = require('../../../src');

module.exports = class ReloadCommand extends StdinCommand {
	constructor(client) {
		super(client, {
			id: 'stdinReload',
			name: 'reload',
		});
	}

	async run() {
		this.client.commands.components.forEach(command => command.reload());
		console.log(`Reloaded ${this.client.commands.components.size} commands`);
	}
};