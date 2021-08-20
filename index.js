const Discord = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const prefix = '?';
const client = new Discord.Client({ intents: 32767 });

client.on('ready', () => {
    console.log('Tutorial bot is ready to go!')
})

client.on('messageCreate', async message => {

    function isCommand(command){
        return !!message.content.toLowerCase().startsWith(prefix + command);
    };
    
    if(isCommand('soundboard')){
        const channel = message.member.voice.channel;
        if(!channel) return message.channel.send('Bro join a voice channel smh :wink:');

        const player = voiceDiscord.createAudioPlayer();
        const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/877988588233580598/877991781063610439/bruh.mp3');

        const connection = voiceDiscord.joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        player.play(resource)
        connection.subscribe(player)

        // checking for ending, leaving vc if yes

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            connection.destroy() // leaves vc and destroys connection
        })
    }
})
client.login('ODYyNjMzMDYzNTY4Mzc1ODEy.YObLpQ.L9FbCcrALAOwiPIqsYf8HPWb9Q8')