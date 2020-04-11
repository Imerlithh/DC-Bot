const fs = require('fs');

module.exports.readJson = async (filepath) => {
    return new Promise(resolve=>{
        let path = `${filepath}` 
		fs.readFile(path, (errr ,deyta) => {
        console.log("check data");
        console.log(filepath);
		if(errr) throw errr;
		let x = JSON.parse(deyta);
		resolve(x)
		});
	});
}



function rewrite(bilgi){
	return new Promise(resolve=>{
		fs.writeFile("test.json", JSON.stringify(bilgi,null,2), (err) => {
			if (err) throw err;
			console.log('Data written to file');
			resolve();
		});
	})

}

function write(){
	return new Promise(resolve=>{
		fs.writeFile("test.json", JSON.stringify(bilgi,null,2), (err) => {
			if (err) throw err;
			console.log('Data written to file');
			resolve();
		});
	})

}

module.exports.help = {
    enabled : false,
    name: "file_cmds"
}

module.exports.run = async (bot, oldMember, newMember) => {}

