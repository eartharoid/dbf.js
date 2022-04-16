require('dotenv').config();

const { Client } = require('../src');

const client = new Client({ intents: ['GUILDS'] }, { baseDir: './test' });

client.login().then(() => console.log('Connected'));
