require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; // Ignore bot messages

    if (message.content.startsWith('!get')) {
        try {
            const response = await axios.get(API_BASE_URL, {
                headers: {
                    'X-API-KEY': API_KEY
                },
                params: {
                    param1: 'value1' // Replace with your query parameters
                }
            });
            message.channel.send(`GET response: ${JSON.stringify(response.data)}`);
        } catch (error) {
            message.channel.send(`Error: ${error.response ? error.response.data : error.message}`);
        }
    } else if (message.content.startsWith('!post')) {
        try {
            const response = await axios.post(API_BASE_URL, {
                param1: 'value1' // Replace with your JSON payload
            }, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            message.channel.send(`POST response: ${JSON.stringify(response.data)}`);
        } catch (error) {
            message.channel.send(`Error: ${error.response ? error.response.data : error.message}`);
        }
    }
});

client.login(DISCORD_BOT_TOKEN);

