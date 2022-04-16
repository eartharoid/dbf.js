const { Listener } = require('../../../src');

module.exports = class ConditionPassListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.conditions,
			event: 'conditionPass',
			id: 'conditionPass',
		});
	}

	async run(name, ctx) {
		console.log('cond#pass', name);
		// ctx.interaction or ctx.message
	}
};