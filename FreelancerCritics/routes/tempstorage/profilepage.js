var express = require('express');
var router = express.Router();

var accountType;
var userID;

/* GET profilepage page. */
router.get('/', function(req, res, next) {
    res.render('profilepage', { title: 'Profile' });
});

module.exports = router;


function EditPage(){
    
}

function WriteReview(){
    
}

function DeleteAcc(){
    
}

function DisplayProfile(){
    
}

function ViewHistory(){
    
}

function GoToHome(){
    
}
