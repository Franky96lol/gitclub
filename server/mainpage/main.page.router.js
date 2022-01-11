const express = require('express');
const router = express.Router();
const mainpage = require('./main.page.js');


router.get('/index/:param' , (req , res , next) => {
	   console.log(req.params);
	   switch(req.params.param){
	       case 'info':
	           mainpage.info(req , res , next);
	       break;
	       default:
	           mainpage.page(req , res , next);
	       break;
	   }
});
//router de mainpage
router.get('/index' , (req , res , next) => mainpage.page(req , res , next));


module.exports = router;
