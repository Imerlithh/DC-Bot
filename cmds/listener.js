module.exports.listen = async (bot,message) =>{
    const botsettings = require('../botsettings.json');
    let estr = bot.commands.get("easter");
    estr.run(bot,message);
    let clean = bot.commands.get("cleaner");
    clean.clean(bot,message);

}

module.exports.help ={
    name:"listener",
    enabled: true
}