const { Listener } = require('../../../src');

module.exports = class ClientReadyListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client,
			event: 'ready',
			id: 'clientReady',
		});
	}

	async run() {

		// const fetched = await this.client.application.commands.fetch('810934178946351174');
		// for (const [, command] of fetched) await command.delete();

	}
};