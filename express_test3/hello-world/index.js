var express = require('express');
var fs = require("fs");

var app = express();
var routes = require('./routes/index')(app);

app.use(express.static(__dirname + '/public'));


//app.get('/',function(req,res){
//	res.send('<div>hello world!</div');
//});
var a = app.disabled('lala land');
var b = app.enable('lala land');
var c = app.disabled('lala land');
app.set('id','zhangfei');
console.log(a);
//console.log(b);
console.log(c);


// 一个简单的 logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});


var data = fs.readFileSync('index.txt');
console.log(data.toString());


app.listen(1314);