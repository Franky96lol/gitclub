const config = require('../../config.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//funcion generadora de tokens
function generateToken(_id){
	   if(_id == null || _id == undefined) return null; //si el id insertado es nulo o indefinido retornamos null
	   return jwt.sign({id : _id } , config.TOKEN.secret , {expiresIn : config.TOKEN.expire}); //generamos el token almacenando el id de usuario en el
}

//verificacion de token
function verifyToken(req){
	  let token;
	  
	  if(req.params.token != undefined) token = req.params.token;
	  if(req.body.token != undefined) token = req.body.token;
	  if(token == null || token == undefined) return false; //si el token es nulo o indefinido retornamos false
	  return jwt.verify(token , config.TOKEN.secret , (err) => {
	  	   if(err) return false; //si ocurre un error al parsear el token retornamos false
	  	   return true; //si el token es verificado retornamos true
	  });
}

module.exports = {generateToken , verifyToken};
