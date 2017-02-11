var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');

var web=require('./routes/web');
var api=require('./routes/api');

var port = 3000;

var app=express();

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',web);
app.use('/api',api);

app.listen(port,function () {
    console.log("Server started on port "+port);
});