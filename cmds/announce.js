    const ytdl = require('ytdl-core');
    const botsettings = require('../botsettings.json');
    const prefix = botsettings.prefix;
    const fs = require('fs');
    const list = new Map();
    function read(info){
        return new Promise(resolve => {
            fs.readFile(info ,(err,data) => {
                console.log("check1");
                if(err) throw err;
                let x =JSON.parse(data);
                resolve(x);
            })
        })
    }
module.exports.run = async (bot, oldMember, newMember) => {
    if(oldMember&&newMember){}
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    const queue = new Map();
    const serverQueue = queue.get(newMember.guild.id);
    
   
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        if (fs.existsSync(`./cmds/guilds/${newMember.channel.guild.id}/userdata/${newMember.id}/userdata.json`)) {
            console.log("-----------Announce Bot--------------");
            console.log(`${newMember.member.user.tag} joined a channel!`);
            console.log("Person Exists");
            console.log('Joining Channel');
            // User Joins a voice channel
            // let deyta = require(`../cmds/guilds/${newMember.channel.guild.id}/userdata/${newMember.id}/userdata.json`)
            let deyta = await read(`./cmds/guilds/${newMember.channel.guild.id}/userdata/${newMember.id}/userdata.json`);
            await console.log("check2");
            var voiceChannel = newMember.channel;      
            if(deyta.type === "local"){
                console.log("Type: Local / not usable anymore!!!");
                voiceChannel.join().then(connection => {
                    var dispatcher = connection.playFile(deyta.sound);
                    setTimeout(() => {
                        dispatcher.destroy();
                        console.log('Destroyed connection');
                        voiceChannel.leave(newMember.voiceChannel);
                    }, 10000);
                    dispatcher.on("end", end => {  }) });   
                    console.log(newMember.member.user.tag);
                    console.log(newMember.channelID); 
            }else if(deyta.type==="online"){
                console.log("Type: online / default!");
                try {
                    if(list.get(newMember.id)===undefined){                       
                        console.log("Unregistered Map / Joined");
                        const songInfo = await ytdl.getInfo(deyta.sound);
                        const song = {
                            title: songInfo.title,
                            url: songInfo.video_url,
                       };
                        voiceChannel.join().then(connection => {              
                            var dispatcher =  connection.play(ytdl(song.url));   
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
    name:'announce',
    enabled: true,
    keepLog: true
}