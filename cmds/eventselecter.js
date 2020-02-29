var messages = new Map();
var strin = [];
var strin2 = [];


module.exports.run = async(bot,message,args) =>{
    message.delete(1000);
    if(args[0] === "create"){
        messages.clear();
        strin = [];
        await message.channel.send("Waiting for event list!\nPlease enter finish when you are done adding events!");
        const msgs = await message.channel.awaitMessages(msg=> {
        if(msg.author === message.author){
            if(msg.content === "finish"){
                return msg.content;
            }else if(msg.content === "0"){
            }else{
                messages.set(messages.size+1,msg.content);
            }
        }
    },{maxMatches:1});
    message.channel.fetchMessages({limit:messages.size+2}).then(x=>message.channel.bulkDelete(x));
    messages.forEach((vals,keys) =>{
        strin.push(vals);
    });
    await message.channel.send(`Event list is ready! Please check:\n${strin.map(x=>x).join("\n")}`).then(x=>{x.delete(6000);});
    await message.channel.send("If there is a problem please enter !eventMaker finish").then(x=>{x.delete(5000);});
    }else if(args[0] === "select" && strin.length >0){
        let a = parseInt(Math.random()*(strin.length));          
        let b = strin[a];
        let i = 0;
        for (let i = 0; i < strin.length; i++) {
            if(!(i === a)){
                strin2.push(strin[i]);
            }
        }
        strin = strin2;
        strin2 = [];
        message.channel.send(`Selected event is: ${b}`).then(x=>x.delete(60000));
    }else if(args[0] === "end"){
        messages.clear();
        strin = [];
    }else if(args[0] === "list"){
        await message.channel.send(`${strin.map(x=>x).join("\n")}`).then(x=>{x.delete(60000);});

    }else{
        if(args[0] === "select"){
            message.channel.send("No events!");
        }
        if(args[0] === "" || args[0] === undefined){
            message.channel.send("Available commands:\n!eventMaker create\n!eventMaker select\n!eventMaker finish").then(x=>{
                x.delete(10000);
            });
        }
    }
}


module.exports.help ={
    name: "em",
    enabled: true
}