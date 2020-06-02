module.exports.run = async (bot, message, args)=>{
    var sb0 = ['D','A','M','E','G','A','M','I'];
    var sb1 = ['d','a','m','e','g','a','m','i'];
    var sb3 = ['d','a','m','e','g','a','m','i'];

    
    const Discord = require('discord.js');
    
     for (let i = 0; i < sb0.length; i++) {
        const rnd = Math.random()*2;
        if (rnd < 0.5) {
            sb3[i] = sb0[i];
        }
        else{
            sb3[i] = sb1[i];
        }      
     }   
    await message.channel.send("<@223826788034412555> You useless being. Someone is calling you!").then(()=>{
        bot.fetchUser("223826788034412555").then(usr => {
            const member = message.guild.member(usr);
            if(member){
                member.setNickname(`${sb3[0]}${sb3[1]}${sb3[2]}${sb3[3]}${sb3[4]}${sb3[5]}${sb3[6]}${sb3[7]}`).catch(err => console.log(err)); 
            }
        });
    })
    
}

module.exports.help ={
    name: "useless",
    enabled: true
}