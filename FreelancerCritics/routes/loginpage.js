var express = require('express');
var router = express.Router();


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('loginpage', { title: 'Login Page' });
});

module.exports = router;

function RememberUsername(){
    
}

function RememberPassword(){
    
}
