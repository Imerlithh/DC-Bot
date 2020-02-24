const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const botsettings = require('./botsettings.json');
const prefix = botsettings.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const LogPerms = new Map();
module.exports.Perms = LogPerms;




fs.readdir("./cmds/" , (err, files) => {
  if(err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0){
    console.log("No Commands to load!");
    return;
  }
  console.log(`loading ${jsfiles.length} commands!`);
  jsfiles.forEach((f,i)=>{
    let props = require(`./cmds/${f}`);
    console.log(`${i+1}:${f} loaded!`);
    if(props.help.enabled){
      bot.commands.set(props.help.name ,props);
      LogPerms.set(props.help.name);
    }
    
  });
});

bot.on('ready', () => {
    console.log('Logged in :P')
    // console.log(bot.commands);
    
} 
);

bot.on('voiceStateUpdate', (oldMember, newMember) => {
   let check = require('./cmds/anounce.js');
   if(check.help.enabled){
    let anouncer = bot.commands.get("anounce");
    anouncer.run(bot, oldMember, newMember); 
    
   }
  
});

bot.on("message" , async msg =>{    //command runner
   let commander = bot.commands.get("commander");
   let listener = bot.commands.get("listener");
   commander.command(bot, msg);
   listener.listen(bot, msg);
   
   
   
});

bot.login(botsettings.token);
//deneme