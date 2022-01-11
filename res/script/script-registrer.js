//script para registro
const submit = document.getElementById('submit');
const submitStop = document.querySelector('.btn-tap');
const pass = document.querySelector('#passUser');
const captchaEval = document.getElementsByName('captcha')[0];
const repass = document.querySelector('#rePassUser');

setInterval(evalForm, 100);

function evalForm(){
		if (pass.value == repass.value && validateCaptcha(false)) {
				submitStop.style.bottom = '0';
				submit.style.color = '#000';
				captchaEval.innerHTML = true;
		} else {
				submitStop.style.bottom = '34.5px';
				submit.style.color = '#e1e1e1';
				captchaEval.innerHTML = false;
		}
}
