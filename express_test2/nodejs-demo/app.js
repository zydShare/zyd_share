
//加载依赖库，原来这个类库都封装在connect中，现在需要单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//加载路由控制
var index = require('./routes/index');
var users = require('./routes/users');

//创建项目实例
var app = express();

//定义ejs模版引擎和模版文件位置，也可以使用jade或者其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public

//定义icon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//var err = new Error('Not Found');
//err.status = 404;
//next(err);
//});

// error handler
//app.use(function(err, req, res, next) {
//// set locals, only providing error in development
//res.locals.message = err.message;
//res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//// render the error page
//res.status(err.status || 500);
//res.render('error');
//});


app.post('/ajax.post*',function(req,res){
	console.log("111")
	var body = '';
	req.on('data',function(chunk){
		console.log("444")
		body += chunk;
	}).on('end',function(){
		try{
			console.log("555")
			console.log('-----------------接收参数-----------------');
			console.log(req.url+body);
			console.log('-----------------接收参数-----------------');
			var path = url.parse(req.url,true).query;
			body = querystring.parse(body);
			if(path.func != undefined){
				body.func = path.func;
			}else if(body.func == undefined){
				res.send('{"code":"-45","msg":" not find func "}').end();
				return;
			}
			body.session = req.session;
			body.path = req.path;
			body.arg = url.parse(req.url, true).query;
			body.startTime = new Date().getTime();
			body.date = moment().format('YYYY-MM-DD HH:mm:ss');
			body.ip = req.ip;
			body.uuid = uuid.v4();
			var ajax = require('./ajax/ajax.js');
			var bool = ajax.searchfile(body.func);
			if(bool){
				ajax.index(req,res,body);
			}else{
				res.send('{"code":"-4","msg":" not find func "}').end();
			}

		}catch(e){
			console.log(e);
			res.send('{"code":"-1","msg":"body error"}').end();
		}
	});

});

var mysql  = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({     
host     : 'localhost',       //主机
user     : 'root',               //MySQL认证用户名
password : '123456',        //MySQL认证用户密码
port: '3306',                   //端口号
});
   
//创建一个connection
connection.connect(function(err){
    if(err){        
          console.log('[query] - :'+err);
        return;
    }
      console.log('[connection connect]  succeed!');
});  

//执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) { 
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
     console.log('The solution is: ', rows[0].solution);  
});  

//关闭connection
//connection.end(function(err){
//  if(err){        
//      return;
//  }
//    console.log('[connection end] succeed!');
//});








app.listen(1314);





module.exports = app;
