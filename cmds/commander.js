module.exports.command = async (bot, message) => {
    const botsettings = require('../botsettings.json');
    const prefix = botsettings.prefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if(!command.startsWith(prefix)) return;  
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args)  
    return;
}

module.exports.run = async(bot,message,args)=>{
    return;
}

module.exports.help ={
    name: "commander",
    enabled: true
}