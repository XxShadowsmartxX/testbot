const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

  client.on('ready', () => {
    console.log('Bot ready');
    client.user.setActivity(`whatever u want`, { type: 'PLAYING' });
  })

  client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  let command;

  if(cmd.length == 0) return;
  if(client.commands.has(cmd)) command = client.commands.get(cmd);

  if(command) command.execute(message, args, client);
});

client.login(`ODMzMTA1NTcxMDYxNjk0NDg1.YHtgBg.cwMprK8358LcKYj5Hs7tn7H2wUc`);
