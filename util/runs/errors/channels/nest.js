const Discord = require("discord.js")
const times = require("../../../data/times.json")

exports.run = (bot, message) => {

    // require guildSettings
    const cleanreplies = bot.guildSettings.get(message.guild.id, 'clean.replies')
    const serverlanguage = bot.guildSettings.get(message.guild.id, 'language')
    const errors = require(`../../../responses/${serverlanguage}/errors/general.json`)
    const nestchannel = bot.guildSettings.get(message.guild.id, 'channels.nest')
    // build embed
    var NEST = new Discord.RichEmbed()
        NEST.setColor(errors.color)
        NEST.setAuthor(errors.code.zero, errors.image)
        NEST.setTitle(errors.permission.channel)
        NEST.setDescription("🔰 <#" + nestchannel + ">")
    return message.channel.send({embed: NEST}).then(deleteIT => {
        if(cleanreplies === true) {               
            deleteIT.delete(times.thirtysec)
        } else { // if clean replies is false and current channel is the nest channel
            if(message.channel.id === nestchannel) {
                message.delete(times.thirtysec).catch(err => {
                    console.log(err + "\nerrors -> channels -> nest.js")
                });
            };
        };
    });
}; 