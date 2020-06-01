    const ytdl = require('ytdl-core');
    const botsettings = require('../botsettings.json');
    const prefix = botsettings.prefix;
    const fs = require('fs');
    const list = new Map();

module.exports.run = async (bot, oldMember, newMember) => {

    if(oldMember&&newMember){}
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    const queue = new Map();
    const serverQueue = queue.get(newMember.guild.id);
    Log();
    if(newMember.user.bot){
        return;
    }
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        if (fs.existsSync(`./cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/userdata.json`)) {
            console.log("-----------Anounce Bot--------------");
            console.log(`${newMember.user.tag} joined a channel!`);
            console.log("Person Exists");
            console.log('Joining Channel');
            // User Joins a voice channel
            let deyta = require(`../cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/userdata.json`)
            var voiceChannel = newMember.voiceChannel;      
            if(deyta.type === "local"){
                console.log("Type: Local / not usable anymore!!!");
                voiceChannel.join().then(connection => {
                    var dispatcher = connection.playFile(`./cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/${deyta.sound}`);
                    setTimeout(() => {
                        dispatcher.destroy();
                        console.log('Destroyed connection');
                        voiceChannel.leave(newMember.voiceChannel);
                    }, 10000);
                    dispatcher.on("end", end => {  }) });   
                    console.log(newMember.user.tag);
                    console.log(newMember.voiceChannel.id); 
            }else if(deyta.type==="online"){
                console.log("Type: online / default!");
                try {
                    if(list.get(newMember.id)===undefined){                       
                        console.log("Unregistered Map / Joined");
                        const songInfo = await ytdl.getInfo(`./cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/${deyta.sound}`);
                        const song = {
                            title: songInfo.title,
                            url: songInfo.video_url,
                       };
                        voiceChannel.join().then(connection => {              
                            var dispatcher =  connection.playStream(ytdl(song.url));   
                            list.set(newMember.id, Date.now());
                            setTimeout(() => {                       
                                console.log('Destroyed Connection');
                                voiceChannel.leave(newMember.voiceChannel);
                            }, 10000);
                            console.log("Updated Map");
                       })
                    }
                    else{                      
                        lister(deyta.sound);
                    }
                } catch (err) {
                    console.log(err);                   
                }                
            }
        }
      
     
    } else if(newUserChannel === undefined){

         // User leaves a voice channel

    }else if (oldUserChannel !== undefined && newUserChannel !== undefined) {
        //  bot.channels.get("672807574713794560").send("deişti hocam");
    }

    async function lister(sound){
    
        if(Date.now()-list.get(newMember.id) >=300000){
            console.log("you are in");
            const songInfo = await ytdl.getInfo(`./cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/${sound}`);
            const song = {
                title: songInfo.title,
                url: songInfo.video_url,
           };
            voiceChannel.join().then(connection => {              
                var dispatcher =  connection.playStream(ytdl(song.url));   
                dispatcher.setVolume(0.25);
                list.set(newMember.id, Date.now());
                setTimeout(() => {                       
                    console.log('destroyed online connection');
                    voiceChannel.leave(newMember.voiceChannel);
                }, 10000);

            })
        }else{
            
            console.log(`User needs to wait : ${300 - parseInt((Date.now()-list.get(newMember.id))/1000,10)} seconds`);
        }   
    }

}


const k = require('../app.js');
function Log() {
    
    if(true)
        console.log(k.isim);
    
}

module.exports.help = {
    name:'anounce',
    enabled: true,
    keepLog: true
}