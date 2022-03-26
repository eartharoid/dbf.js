const errors = require('discord.js/src/errors/DJSError.js');
const { inspect } = require('util');

const messages = {
	F_COMPONENT_ALREADY_LOADED: (id, mod) => `A component with the ID "${id}" is already loaded by the "${mod}" module`,
	F_COMPONENT_NO_MOD: (id, mod) => `The component with the ID "${id}" does not belong to a valid module ("${mod}")`,
	F_INVALID_COMMAND_TYPE: type => `"${type}" is not a valid command type`,
	F_INVALID_TYPE: (name, expected, actual) => `Expected "${name}" to be of type "${expected}", but got "${actual}"`,
	F_MOD_LOADING_ERROR: (mod, error) => `The "${mod}" module encountered an error whilst loading components:\n${inspect(error)}`,
	F_UNKNOWN_COMPONENT: (id, mod) => `"${id}" is not a valid component loaded by the "${mod}" module`,
};

for (const [name, message] of Object.entries(messages)) errors.register(name, message);

module.exports = {
	Error: errors.Error,
	RangeError: errors.RangeError,
	TypeError: errors.TypeError,
};