module.exports.run = async(bot,message,args) =>{      
      var fs = require('fs');
      var warframes = fs.readdirSync('./warframes/');    
      warframes.forEach(warframe => msg.channel.send(warframe));
    
// var selectedwf = '';
// var selectedbuild = '';
// var builds = fs.readdirSync(`./warframes/${selectedwf}/`);
// selectedbuild = {
//  files: [
//       `./warframes/${selectedwf}/${selectedbuild}.png`
//  ]
// };
}

module.exports.help = {
    name:"build",
    enabled: false
}