const dialogCaptcha = document.getElementsByClassName('dialog-background')[0];
const inputCaptcha = document.getElementById('inputcaptcha');
let actualCaptcha = newCaptcha();

function openWindowCaptcha(){
		dialogCaptcha.style.display = 'flex';
		actualCaptcha = newCaptcha();
}

function validateCaptcha(i = true) {
		if (inputCaptcha.value.toUpperCase()==actualCaptcha.toUpperCase()) {
				return true
		} else {
				if (i) {
						inputCaptcha.value = '';
						actualCaptcha = newCaptcha();
				}
				return false
		}
}
