var express=require('express');
var path=require('path');
var cors=require('cors');
var bodyParser=require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var jwt         = require('jwt-simple');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var api=require('./routes/api');
var feedback=require('./routes/feedback');
var question=require('./routes/question');
var material=require('./routes/material');
var answer=require('./routes/answer');
var port = 3000;

var app=express();

//view engine
app.set('views',path.join(__dirname,'client/views'));
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
app.use(cors());



app.use('/api',api);
app.use('/api/feedback',feedback);
app.use('/api/question',question);
app.use('/api/material',material);
app.use('/api/answer',answer);


app.listen(port,function () {
    console.log("Server started on port "+port);
});


