
const { StdinCommand } = require('../../../src');

module.exports = class PublishCommand extends StdinCommand {
	constructor(client) {
		super(client, {
			id: 'stdinPublish',
			name: 'publish',
		});
	}

	async run() {
		this.client.commands.publish()
			.then(commands => console.log('Published %d commands', commands.size))
			.catch(console.error);
	}
};