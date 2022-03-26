require('dotenv').config();

const { Client } = require('../src');

const client = new Client({ intents: ['GUILDS'] }, { baseDir: './test' });

client.mods.get('commands').on('error', error => console.error('ERROR[COMMANDS]:', error));

client.mods.get('commands').on('commandRun', (type, command, context) => console.log('commandRun', type, command.name, context));

client.mods.get('commands').on('commandSuccess', (type, command, context) => console.log('commandSuccess', type, command.name, context));

client.mods.get('commands').on('commandError', (type, command, context) => console.log('commandError', type, command.name, context));

client.mods.get('commands').on('commandAttempt', (type, reason, context) => {
	console.log(type, reason, context);
	if (type === 'stdin' && reason === 'EXISTENCE') console.log(`Attempt to use stdin command that doesn't exist: ${context.commandName}`);
});

// client.login().then(() => console.log('Connected'));