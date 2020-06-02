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
        strin.push(vals);
    });
     await message.channel.send(`complated, map: \n${strin.map(x=>x).join("\n")}`);
    

    
}

module.exports.help = {
    name:"await",
    enabled : true
}