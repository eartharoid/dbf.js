require('dotenv').config();

const { Client } = require('../src');
const { GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	],
}, { baseDir: './test' });

client.login().then(() => console.log('Connected'));
