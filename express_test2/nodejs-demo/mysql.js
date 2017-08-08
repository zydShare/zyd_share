var mysql  = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({     
  host     : '192.168.0.103',       //主机
  user     : 'postgres',               //MySQL认证用户名
  password : 'qqpt123',        //MySQL认证用户密码
  port: '5432',                   //端口号
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
connection.end(function(err){
    if(err){        
        return;
    }
      console.log('[connection end] succeed!');
});

app.post('/ajax.post*',function(req,res){

	var body = '';
	req.on('data',function(chunk){
		body += chunk;
	}).on('end',function(){
		try{
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