var Fiber = require('fibers');
var fs = require('fs');
var config = require('../func/config.js');
var pgdb = require('../func/pgdb.js');
var mongo = require('../func/mongo.js');
var logs = require('../func/logs.js');
var async = require('async');

var main = {};

main.index = function(req,res,body){

	if(body.path.length <= 7){
		var data = {};
		data.code = -2;
		data.message = 'page error';
		res.status(200).send(data);
		res.end();
		return;
	}

	var fileName = body.path.substr(1, body.path.length - 7);

 	if(fileName.split("/").length==2&&fileName.split("/")[1].substr(fileName.split("/")[1].length - 4, fileName.split("/")[1].length - 1)=='ajax'){
        var ajax = require('./'+fileName.split("/")[0]+'/ajax/ajax.js');
        body.func=fileName.split("/")[1];
		body.data=JSON.parse(body.data.data);
        ajax.index(req,res,body);
        return;
    };
	// var file = main.searchfile(fileName);

	var file = fs.existsSync("./routes/"+fileName+'.js');

	if(file){
		body.func = fileName;
	}else{
		var data = {};
		data.code = -3;
		data.message = 'page can not find';
		res.status(200).send(data);
		res.end();
		return;
	}


	var conf = config.get('app');
	var obj = new Object();

	var fiber = Fiber(function (cb){
		/**---------pg-------*/
		if(conf.postgresql.使用 == '是'){
			pgdb.start(obj.pg);//数据库事务开始
		}
		/**---------pg-------*/

		var func = require('./'+body.func+'.js');

		body.send = func.run(body,obj.pg,obj.mongo);

		/**---------pg-------*/
		if(conf.postgresql.使用 == '是'){
			pgdb.end(obj.pg);//数据库事务结束
		}
		/**---------pg-------*/

		cb(null,'');
	});



	async.waterfall([
		function(cb){
			if(conf.postgresql.使用 != '是'){
				cb(null,'');
				return;
			}
			pgdb.open(function(err,client,done){
				if(err){
					console.log('连接pg数据库失败!');
					logs.write('err','错误:连接PG数据库失败,错误信息:'+err);
					res.status(200).send('{"code":-20005,"message":"postgresql error"}');
					res.end();
				}else{
					client.done = done;
					obj.pg = client;
					cb(null,'');
				}
			});
		},
		function(j,cb){
			if(conf.mongodb.使用 != '是'){
				cb(null,'');
				return;
			}
			mongo.open(function(err,db){
				if(err){
					console.log(err);
					console.log('连接Mongo数据库失败!');
					logs.write('mongodb','错误:连接Mongo数据库失败,错误信息:'+err);
					res.status(200).send('{"code":-20006,"message":"mongodb error"}');
					res.end();
				}else{
					obj.mongo = db;
					cb(null,'');
				}
			});
		},
		function(j,cb){
			fiber.run(cb);
		}
	], function (err, result) {

			fiber = null;
			
			if(body.send._isRander == null){
				if(body.send._xhtml != null && body.send._xhtml != '')
					body.func = body.send._xhtml;
				res.render(body.func,body.send);
				res.end();
			}else{
				if(body.send._isExcel != null){ //表格的
					res.setHeader('Content-Type', 'application/vnd.openxmlformats');
					res.setHeader("Content-Disposition", "attachment; filename=" + body.date + "_" + body.startTime + ".xlsx"); //默认名 
					res.end(body.send._isExcel, 'binary'); //'binary'值必须 否则excel打不开
				}else{
					res.status(200).send(body.send._isRander);
				}
			}
			// res.status(200).send(body.send);

			body.endTime = new Date().getTime();
			body.Time = body.endTime - body.startTime;
			// body.send.Time = body.Time;
			console.log('---------------------------------');
			console.log('ejs接口:'+body.func+'---运行时间:'+body.Time+'毫秒');
			console.log('---------------------------------');

			pgdb.close(obj.pg);

			if(conf.mongodb.使用 == '是'){
				obj.mongo.collection(conf.main.servername+'_ejsLogs').save(body,function(err,result){
					if(err){
						logs.write('ejsLogs','MongoDB_ejsLogs_error:'+err);
					}
					mongo.close(obj.mongo);//连接释放
				});

			}

	})

	




}

main.searchfile = function(fileName){

	var js_file = false;
	var mb_file = false;
	var js_files = fs.readdirSync(__dirname);
	for(var i = 0 ; i < js_files.length ; i++){
		if(js_files[i] == fileName+".js"){
			js_file = true;
			break;
		}
	}


	var path = require("path");
	var html_path = path.resolve(__dirname, '..','www');

	var mb_files = fs.readdirSync(html_path);
	
	for(var i = 0 ; i < mb_files.length ; i++){
		if(mb_files[i] == fileName+".ejs"){
			mb_file = true;
			break;
		}
	}

	if(js_file == true && mb_file == true){
		return true;
	}

	return false;
}


module.exports = main;