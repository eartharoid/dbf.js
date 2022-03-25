const { StdinCommand } = require('../../../src');

module.exports = class ReloadCommand extends StdinCommand {
	constructor(client) {
		super(client, { name: 'reload' });
	}

	async run() {
		/** @type {import('../../../src/commands/CommandsModule')} */
		const commandsModule = this.client.mods.get('commands');
		const files = await commandsModule.readDir();
		files.forEach(file => delete require.cache[file]);
		await commandsModule.load();
		const count = Object.entries(commandsModule.commands).reduce((count, [, collection]) => count + collection.size, 0);
		console.log(`Reloaded ${count} commands`);
	}
};