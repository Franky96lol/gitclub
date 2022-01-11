const config = require('../../config.js');
const fs = require('fs');
const authenticator = require('./authenticator');
const bcrypt = require('bcryptjs');

//funcion de logeo de usuario
function login(req , res , next){
    //recopilamos los datos insertados
    let username = req.body.username;
    let password = req.body.password;
    
    
    //comprobamos si existe el usuario
    if(!fs.existsSync(config.DB + '/accounts/' + username + '.json')) return {message : 'false' , submessage : 'account_dont_exists'};
    //si existe almacenamos los datos momentaneamente 
    let account = JSON.parse(fs.readFileSync(config.DB + '/accounts/' + username + '.json' , 'utf8'));
    //comprobamos si las contraseñas coinciden
    if(!bcrypt.compareSync(password ,account.password)) return {message: 'false' , submessage : 'wrong_password'};
    //si las contraseñas coinciden generamos el token y lo enviamos al usuario
    //comprobamos si la cuenta tiene un id
    if(account.id == null || account.id == undefined) return {message: 'false' , submessage : 'corrupted_id'};
    return {message : 'true', token : authenticator.generateToken(account.id)};
}

module.exports = login;
