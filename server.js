var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var jwt         = require('jwt-simple');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model

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

// Use the passport package in our application
app.use(passport.initialize());

mongoose.connect(config.database);


app.use(session({secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    // store:new MongoStore({mongooseConnection:mongoose.connection})
}));

require('./config/passport')(passport);

app.use('/',web);
app.use('/api',api);

app.listen(port,function () {
    console.log("Server started on port "+port);
});


