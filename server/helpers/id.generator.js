var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function getARandomOneInRange() {
    return possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  function generateId(num){
  	var token = '';
  	for(let x = 0 ;x < num ;x++){
  		token += getARandomOneInRange();
  	}
  	
  	return 'a' + token;
  }
module.exports = generateId;
