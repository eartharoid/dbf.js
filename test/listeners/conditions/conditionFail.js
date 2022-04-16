const { Listener } = require('../../../src');

module.exports = class ConditionFailListener extends Listener {
	constructor(client) {
		super(client, {
			emitter: client.conditions,
			event: 'conditionFail',
			id: 'conditionFail',
		});
	}

	async run(name, ctx) {
		console.log('cond#fail', name, ctx);
		// ctx.interaction or ctx.message
	}
};