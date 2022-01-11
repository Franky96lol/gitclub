//inicializacion de modulos
const express = require('express');
const config = require('./config.js');
const app = express();
const busboy = require('connect-busboy');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./server/router.js');

app.use(busboy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//inicializacion de recursos
app.use(express.static(config.DIRNAME + '/res'));

// rutas
app.use('/',router);

//control de error de ruta
app.use((req , res , next) => res.status(404).json({message : 'ERROR 404'}));


// iniciando servidor
const server = app.listen(config.PORT, function () {
    console.log('GitClub server running on port ' + config.PORT +'...');
});
