module.exports.run = async (bot, message, args) => {
        const messg = message.content.split(' ');
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        member.setNickname('deneme').catch(err => console.log(err));
        message.reply(`denendi onaylandı. denenen: ${user.tag}`).catch(err => console.log(err));
        
        const fetcheddata = message.channel.fetchMessages({limit:2}).then(mssg =>{ 
          message.channel.send(`${mssg.size} mesaj var 10 saniye içinde silinecek`);
          setTimeout(function(){
            message.channel.bulkDelete(mssg);
            message.channel.send('Mesajlar silindi test başarılı :P');
          },10000);           
         }).catch(err => message.channel.send(err));
}

module.exports.help = {
    name: "gg",
    enabled: true

}