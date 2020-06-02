module.exports.run = async (bot, message, args) => {
    await message.channel.send("waiting!");
    const messages = new Map();
    var strin = [];
    
    const msgs = await message.channel.awaitMessages(msg=> {
       
        if(msg.content === "asdf"){
            return msg.content;
        }else{
            messages.set(messages.size+1,msg.content);
        }
    },{maxMatches:1});
    messages.forEach((vals,keys) =>{

    })
    // await message.channel.send(`complated, map: ${}`);
    

    
}

module.exports.help = {
    name:"await",
    enabled : true
}