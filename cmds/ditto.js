const Client = require('discord.js');
const bt = new Client.Client();
module.exports.run = async (bot, message, args) =>{
    let txtchannel = bt.guilds.get("678917347163242496").channels.find(c=>c.id === "679103001272647713");
     
    
}

module.exports.help={
    name: "ditto",
    enabled: false
}