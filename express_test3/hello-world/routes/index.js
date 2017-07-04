var path = require('path');
var myFilePath = '../package1.json';
var b = path.parse(myFilePath).base
var a = path.resolve(myFilePath, './baz')
console.log(a)
module.exports = function (app){
	
	app.get('/',function (req,res){
		res.send('Hello world');
	});
	
	app.get('/customer',function (req,res){
		res.send('customer page');
	});
	
	app.get('/admin',function (req,res){
		res.send('admin page');
	});
	
};
