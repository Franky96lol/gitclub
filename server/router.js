const express = require('express');
const router = express.Router();
const auth = require('./authentication/auth.router.js');
const mainpage = require('./mainpage/main.page.router.js');

//router de autenticaciones
router.use('/auth' , auth);
//router de mainpage
router.use('/' , mainpage);

module.exports = router;
