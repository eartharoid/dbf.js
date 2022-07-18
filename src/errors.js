const { inspect } = require('util');

const messages = {
	ComponentAlreadyLoaded: (id, mod) => `A component with the ID "${id}" is already loaded by the "${mod}" module`,
	ComponentNoMod: (id, mod) => `The component with the ID "${id}" does not belong to a valid module ("${mod}")`,
	InvalidCommandType: type => `"${type}" is not a valid command type`,
	InvalidConditionType: type => `"${type}" is not a valid condition type`,
	InvalidMenuCommandType: id => `The menu command with the id "${id}" must have a "type" of "message" or "user"`,
	InvalidType: (name, expected, actual) => `Expected "${name}" to be of type "${expected}", but got "${actual}"`,
	ModLoadingError: (mod, error) => `The "${mod}" module encountered an error whilst loading components:\n${inspect(error)}`,
	UnknownComponent: (id, mod) => `"${id}" is not a valid component loaded by the "${mod}" module`,
};



module.exports = {
	Error: class extends Error {
		constructor(id, ...values) {
			const message = messages[id](...values);
			super(message);
			this.name = `Error [${id}]`;
		}
	},
	RangeError: class extends RangeError {
		constructor(id, ...values) {
			const message = messages[id](...values);
			super(message);
			this.name = `RangeError [${id}]`;
		}
	},
	TypeError: class extends TypeError {
		constructor(id, ...values) {
			const message = messages[id](...values);
			super(message);
			this.name = `TypeError [${id}]`;
		}
	},
};