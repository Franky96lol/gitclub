const config = require('../../config.js');
const fs = require('fs');

//pagina principal
function mainPage(req , res , next){
	   res.sendFile(config.RES + '/html/index.html');
}

//exportacion de la informacion de la pagina principal
function mainPageInfo(req , res , next){
	   let mainpageInfo = JSON.parse(fs.readFileSync(config.DIRNAME + '/server/mainpage/main.page.data.json' , 'utf8'));
	   res.json(mainpageInfo);
}

module.exports = {info : mainPageInfo ,page : mainPage};
