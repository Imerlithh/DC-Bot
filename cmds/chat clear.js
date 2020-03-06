module.exports.run = async (bot, message, args) => {
  if(!(message.author.id == "236568000675840002")) return;
        try {
          const fetch = message.channel.fetchMessages().then(messages => message.channel.bulkDelete(messages));
        } catch (error) {
          console.log(error);
        }   
}

module.exports.help = {
    name: "!clear-all",
    enabled: true
}