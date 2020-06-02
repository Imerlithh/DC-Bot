module.exports.clean = async (bot, message) =>{
    if(message.channel.name === 'bot-komut' || message.channel.name === 'nightwave-radio'){   
        const fetch = message.channel.fetchMessages().then(mssg =>{
          try {        
            setTimeout(function(){
              message.channel.bulkDelete(mssg);
            },80000);
            
          } catch (error) {
            console.log(error);
          }
        });
    }
}

module.exports.run = async(bot,message,args)=>{
  return;
}

module.exports.help ={
    name:"cleaner",
    enabled: true
}