const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require('node-fetch');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => {
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.ownser.id) {
        const data = {
            name: 'ping',
            description: 'Replies with Pong!',
        }
        const command = await client.application?.commands.create(data);
        console.log(command);
    }

})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	const { commandName: command } = interaction;
    client.on('interactionCreate', async interaction => {
        //..
        if (command === 'cat') {
            const { file } = await fetch('https://aws.random.cat/meow').then(responce => responce.json());
            interaction.reply({ files: [file] })
        }
    })
    const querystring = require('querystring');
    //.. 
    client.on('interactionCreate', async interaction => {
        //... 
        if (command === 'urban') {
            const term = interaction.options.getString('term');
            const term = querystring.stringify({ term });

            const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
                .then(responce => responce.json());
        }

        if (command === 'urban') {
            //... 
            if (!list.length) {
                return interaction.reply(`No results found for **${term}**.`);
            }
            interaction.reply(`**${term}**: ${list[0].definition}`);
        }
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        const [answer] = list;

        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },

            
            );
            interaction.reply({ embeds: [embed] });
    })
	// ...
});

client.login('');
