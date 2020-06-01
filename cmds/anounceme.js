const fs = require('fs');

module.exports.run = async(bot,message,args)=> {
    const user = await message.author;
    const member = await message.guild.member(user);
    const uid = user.id;
    let arg = `${args[0]}`;
    if(args === undefined){
        
        let userdata = { 
            nick:`${user.tag}`,
            sound:'anounce.mp3',
            type: 'local'
        };
        create(userdata);
        console.log("local");
        return;
    }else{
        if(arg.startsWith("https://www.youtube.com") || arg.startsWith("www.youtube.com") || arg.startsWith(" https://youtu.be/") || arg.startsWith(" https://youtu.be")){
            let userdata = { 
                nick:`${user.tag}`,
                sound:arg,
                type: 'online'            
        }
        create(userdata);
        }else{
            message.channel.send("Please enter a youtube link!");
            console.log(arg);
        }
        
              
    }
    
    function create(userdata){
        
    let data = JSON.stringify(userdata, null, 2);
    if(!fs.existsSync(`./cmds/guilds/${message.guild.id}`)){
        const k = fs.mkdir(`./cmds/guilds/${message.guild.id}`, err => {
            if(err){
                throw err;
            }
        });
        const l = fs.mkdir(`./cmds/guilds/${message.guild.id}/userdata`,err =>{
            if(err){
                throw err;
            }
        });
    }

    if(!fs.existsSync(`./cmds/guilds/${message.guild.id}/userdata/${uid}`)){
        const k = fs.mkdir(`./cmds/guilds/${message.guild.id}/userdata/${uid}`, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    const l = fs.writeFile(`./cmds/guilds/${message.guild.id}/userdata/${uid}/userdata.json`, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    }



}

module.exports.help ={
    name:'anounceme',
    enabled: true
}