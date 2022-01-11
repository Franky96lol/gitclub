const config = require('../../config.js');
const express = require('express');
const router = express.Router();
const login = require('./login');
const register = require('./register');

//router login y register
router.post('/login' , (req , res , next) => res.json(login(req , res , next)));
router.get('/register' , (req , res , next) => res.sendFile(config.RES + '/html/register.html'));
router.post('/register' , (req , res , next) => res.json(register(req , res , next)).redirect('/index'));

module.exports = router;
