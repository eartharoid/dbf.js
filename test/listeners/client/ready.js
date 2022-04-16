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
		this.commands.publish()
			.then(console.log)
			.catch(console.error);
	}
};