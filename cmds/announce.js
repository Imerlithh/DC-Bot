    const ytdl = require('ytdl-core');
    const botsettings = require('../botsettings.json');
    const prefix = botsettings.prefix;
    const fs = require('fs');
    const list = new Map();
    const json_manager = require('./file_cmds.js');
    


module.exports.run = async (bot, oldMember, newMember) => {

    if(oldMember&&newMember){}
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    const queue = new Map();
    const serverQueue = queue.get(newMember.guild.id);
    
    if(newMember.user.bot){
        return;
    }
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        let path = `./cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/userdata.json`
        if (fs.existsSync(path)) {
            json_manager.readJson(path).then(userjsondata => {
            console.log("-----------Announce Bot--------------");
            console.log(`${newMember.user.tag} joined a channel!`);
            console.log("Person Exists");
            console.log('Joining Channel');
            // User Joins a voice channel
            //let deyta = require(`../cmds/guilds/${newUserChannel.guild.id}/userdata/${newMember.id}/userdata.json`)
            var voiceChannel = newMember.voiceChannel;      
            if(userjsondata.type === "local"){
                console.log("Type: Local / not usable anymore!!!");
                voiceChannel.join().then(connection => {
                    var dispatcher = connection.playFile(userjsondata.sound);
                    setTimeout(() => {
                        dispatcher.destroy();
                        console.log('Destroyed connection');
                        voiceChannel.leave(newMember.voiceChannel);
                    }, 10000);
                    dispatcher.on("end", end => {  }) });   
                    console.log(newMember.user.tag);
                    console.log(newMember.voiceChannel.id); 
            }else if(userjsondata.type==="online"){
                console.log("Type: online / default!");
                try {
                    if(list.get(newMember.id)===undefined){                       
                        console.log("Unregistered Map / Joined");
                        const songInfo = ytdl.getInfo(`${userjsondata.sound}`);
                        
                        voiceChannel.join().then(connection => {              
                            var dispatcher =  connection.playStream(ytdl(`${userjsondata.sound}`));   
                            list.set(newMember.id, Date.now());
                            setTimeout(() => {                       
                                console.log('Destroyed Connection');
                                voiceChannel.leave(newMember.voiceChannel);
                            }, 10000);
                            console.log("Updated Map");
                       })
                    }
                    else{                      
                        lister(userjsondata.sound, voiceChannel);
                    }
                } catch (err) {
                    console.log(err);                   
                }                
            }


            });
            
        }
      
     
    } else if(newUserChannel === undefined){

         // User leaves a voice channel

    }else if (oldUserChannel !== undefined && newUserChannel !== undefined) {
        //  bot.channels.get("672807574713794560").send("deişti hocam");
    }

    async function lister(sound, vchannel){
    
        let voiceChannel = vchannel;
        if(Date.now()-list.get(newMember.id) >=300){
            console.log("you are in");
            const songInfo = await ytdl.getInfo(sound);
            const song = {
                title: songInfo.title,
                url: songInfo.video_url,
           };
            voiceChannel.join().then(connection => {              
                var dispatcher =  connection.playStream(ytdl(`${sound}`));   
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
    name:'announce',
    enabled: true,
    keepLog: true
}