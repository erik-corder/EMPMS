const express = require('express');
var multer  = require('multer');
var ejs = require('ejs');
const user = require('./routes/users');
const AddItem = require('./routes/AddItems');
const deduction = require('./routes/deductions');
const AddSalary = require('./routes/salaries');
const givendata = require('./routes/sales/givendataAday');
const salesData = require('./routes/sales/salesdata');
const Allowance = require('./routes/Allowances');
const Stock = require('./routes/Stock');
const config = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true);

app.use(cors({origin:"http://localhost:4200"}));

app.use( function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD, OPTIONS, PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
  next();
});

//passport midleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

//body parser for json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ejs
app.set('view engine','ejs');

//database connection
const connection = mongoose.connect(config.database,{ useNewUrlParser: true });
if(connection){
  console.log("databased connected");
}else{
  console.log("database not connected");
}

//set file system
app.use(express.static(path.join(__dirname,"public")));

//access user file in routes folder
app.use('/user',user);
app.use('/AddItem',AddItem);
app.use('/Deduction',deduction);
app.use('/Salary',AddSalary);
app.use('/givendataAday',givendata);
app.use('/salesdata',salesData);
app.use('/allowance',Allowance);
app.use('/stock',Stock);

//route
app.get('/', function (req, res) {
    res.send('Hello world');
});

//server
app.listen(port,function(){
    console.log("liste to port "+port);
});