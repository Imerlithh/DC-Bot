module.exports.run = async(bot,message,args) =>{
    const map = new Map();
    await message.channel.send("Waiting for event list!");
    const msgs = await message.channel.awaitMessages(msg=> {
        console.log(msg.content);
        if(msg.content === "asdf"){
            //break;
        }else{
            return msg.content;
        }       
    },stop());
    await message.channel.send(`complated, map: ${msgs.map(msg=>msg.content).join(" ")}`);

    // while(true){
    //     const msgs = new Map();
    //     co
    // }
    

}


module.exports.help ={
    name: "eventMaker",
    enabled: false,
    keepLog: true
}