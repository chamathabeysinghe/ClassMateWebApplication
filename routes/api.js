var express=require('express');
var router=express.Router();

router.get('/',function (req, res, next) {
    res.json({initial:"This is initial api request"});
});

module.exports=router;