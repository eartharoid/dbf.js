const errors = require('discord.js/src/errors/DJSError.js');

const messages = {
	F_INVALID_COMMAND_TYPE: type => `"${type}" is not a valid command type`,
	F_MOD_LOADING_ERROR: (mod, error) => `The "${mod}" module encountered an error whilst loading components: ${error}`,
};

for (const [name, message] of Object.entries(messages)) errors.register(name, message);

module.exports = {
	Error: errors.Error,
	RangeError: errors.RangeError,
	TypeError: errors.TypeError,
};