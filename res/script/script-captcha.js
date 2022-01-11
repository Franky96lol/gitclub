//generar y recargar el captcha
const captcha = document.getElementById('captcha');
let textCaptcha = "";

function newCaptcha() {
		captcha.innerHTML = "";
		textCaptcha = "";
		let options =  "ABCDEFGHIJQLMNÑOPQRSTUVWXYZ234567890";
		let optionsColor = "#0011af;#9e0600;#189e00;#444444";
		options = options.split('');
		captcha.style.background = "linear-gradient(" + xRandom(0,360) + "deg," + listRandom(optionsColor) + "," +listRandom(optionsColor) + "," + listRandom(optionsColor)+"," +listRandom(optionsColor) + "," + listRandom(optionsColor)+")";
		
		for(let i = 0;i<6;i++){
				let xletter = xRandom(0,options.length-1);
				let letterElement = document.createElement('span');
				letterElement.innerHTML = options[xletter];
				textCaptcha += options[xletter];
				
				letterElement.style.color = listRandom("#ff0000;#00ff00;#0000ff;#000");
				letterElement.style.fontFamily = listRandom('sans-serif;monospace;fantasy;cursive');
				letterElement.style.filter = "blur("+xRandom(0,1)+"px)";
				letterElement.style.padding = xRandom(-10,3)+'px';
				letterElement.style.fontSize = xRandom(14,25)+"px";
				letterElement.style.display = "block";
				letterElement.style.transform = "rotate("+xRandom(-30,30)+"deg)";
				captcha.appendChild(letterElement);
		}
		return textCaptcha;
}


//funciones complementarias
function xRandom(min,max){
		return Math.round(Math.random()*(max-min))+min;
}
function listRandom(str){
		str = str.split(';');
		return str[xRandom(0,str.length-1)];
}
