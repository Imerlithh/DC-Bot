module.exports.run = async (bot, message) =>{
    const fs = require('fs');
   
//     if(fs.existsSync(`./cmds/guilds/${message.guild.id}/userdata/262321312184139776/easter.json`)){
//     if(message.content === "!easter gg"){     
//         const data = {
//             enabled: false
//         } 
//         let yess = JSON.stringify(data, null, 2);
//         const l = fs.writeFile(`./cmds/guilds/${message.guild.id}/userdata/262321312184139776/easter.json`, yess, (err) => {
//             if (err) throw err;
//             console.log('Data written to file');
//         });
//         return;
//     }else if(message.content === "!easter gfg"){
//         const data = {
//             enabled: true
//         } 
//         let yess = JSON.stringify(data, null, 2);
//         const l = fs.writeFile(`./cmds/guilds/${message.guild.id}/userdata/262321312184139776/easter.json`, yess, (err) => {
//             if (err) throw err;
//             console.log('Data written to file');
//         });
//         return;

//     }

// }
    if(message.content.toLowerCase().includes("useless")){
        
        if(message.author.bot){
            return;
        }
        //
        const useles = require('../cmds/useless.js');
        useles.run(bot, message, "none");
        
    }

    if(message.content.toLowerCase().includes("uwu")){
        if(message.author.bot) return;
        const uwu = require('../cmds/uwu.js');
        uwu.run(bot,message,"none");
    }

    // if(fs.existsSync(`./cmds/guilds/${message.guild.id}/userdata/262321312184139776/easter.json`)){
    // const enn = require(`./cmds/guilds/${message.guild.id}/userdata/262321312184139776/easter.json`);}
    const id = message.author.id.toString();

         if(id === "262321312184139776"){
            const rnd = Math.random()*101;
            const user = await message.author;
            const member = await message.guild.member(user);
            if(rnd<=20){              
                member.setNickname('GG Kush').catch(err => console.log(err));                    
            }else if(rnd>20 && rnd <=40){          
                member.setNickname('Pterodactyl').catch(err => console.log(err));  
            }else if(rnd>40 && rnd <= 60){
                member.setNickname('Dinazor Amca').catch(err => console.log(err));                 
            }else if(rnd>60 && rnd <= 80){
                member.setNickname('GG Kusch').catch(err => console.log(err));  
            }else{
                member.setNickname('Polly Kraker İster').catch(err => console.log(err));  
            }     
     }  
}

module.exports.help = {
    name:"easter",
    enabled: true
}