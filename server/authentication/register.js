const config = require('../../config.js');
const fs = require('fs');
const idGenerator = require('../helpers/id.generator.js');
const bcrypt = require('bcryptjs');

//modelo basico de cuenta de usuario
const accountModel = {
    id : '', //id unico autogenerado
    username : '',
    email : '',
    password : '',
    profilepic : '', //ruta de la foto de perfil
    projectpath : '', //ruta de guardado de proyectos del usuario
    reputation : 0, //reputacion del usuario
    verified : 'false', //cuenta verificada (por defecto false)
    acclevel : 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
};

//funcion de registro de usuario
function register(req , res , next){
	   //recopilamos la informacion del cliente enviada mediante POST
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let rpassword = req.body.rpassword;
    
 
    //verificamos que no existan datos indefinidos
    if(username == undefined) return {message: 'false', submessage: 'username_empty'};
    if(email == undefined) return {message: 'false', submessage: 'email_empty'};
    if(password == undefined) return {message: 'false', submessage: 'password_empty'};
    
    //si no existen datos indefinidos pasamos a verificar los datos
    //verificamos que la cuenta no esta en uso
    if(fs.existsSync(config.DB + '/accounts/' + username + '.json')) return {message: 'false' , submessage : 'acc_in_use'};
    //si la cuenta no existe procedemos a verificar que los passwords coincidan y tengan la longitud minima
    if(password.length < 8) return {message: 'false' , submessage: 'pass_wrong_length'};
    if(password != rpassword) return {message: 'false' , submessage: 'pass_dont_match'};
    //si las contraseñas coinciden y tienen la longitud minima verificamos que el correo sea un correo valido
    if(!validateEmail(email)) return {message: 'false' , submessage: 'wrong_mail_format'};
    //si es un correo valido verificamos que ya no exista una cuenta con ese correo
    if(existsEmail(email)) return {message: 'false' , submessage: 'email_in_use'};
    //si todo es correcto pasamos los valores a el modelo de la cuenta
    let account = accountModel;
    account.id = idGenerator(16); //generamos el id unico de 16 caracteres alfanumericos
    account.username = username;
    account.email = email;
    account.password = bcrypt.hashSync(password, 10); //generamos un hash para mayor proteccion de la contraseña
    
    //escribimos en la base de datos los datos del usuario
    try{
        fs.writeFileSync(config.DB + '/accounts/' + username + '.json' , JSON.stringify(account));
        setEmail(email);
        //si se escribe correctamente hacemos saber al usuario de que se ah registrado correctamente
        return {message: 'true' , submessage: 'user_registered'};
    }catch(err){
    	    //capturamos si ocurre un error y lo enviamos a la consola y al usuario (esperemos nunca llegar aqui)
    	    console.log(err);
    	    return {message: 'error' , submessage: 'Error:\n' + err};
    }
}

//funcion para validar que un correo tenga el formato apropiado
function validateEmail(email) { 
	   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
	   return re.test(String(email).toLowerCase()); 
}

//funcion para verificar que un correo no esta en uso
function existsEmail(_email){
	   let emails = JSON.parse(fs.readFileSync(config.DIRNAME + '/database/emails.json'));
	   for(let email of emails){
	   	    if(email == _email) return true;
	   	}
	   	return false;
}

//funcion para insertar el nuevo correo de usuario en la lista de correos
function setEmail(_email){
	   let emails = JSON.parse(fs.readFileSync(config.DIRNAME + '/database/emails.json'));
	   emails[emails.length] = _email;
	   try{
	   	    fs.writeFileSync(config.DIRNAME + '/database/emails.json' , JSON.stringify(emails));
	   	}catch(err){
	   		   console.log(err);
	   	} 
}

module.exports = register;
