const { Listener } = require('../../../src');

module.exports = class ConditionErrorListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.conditions,
			event: 'conditionError',
			id: 'conditionError',
		});
	}

	async run(ctx) {
		console.log('cond#error', ctx);
	}
};