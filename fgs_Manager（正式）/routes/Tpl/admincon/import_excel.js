/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var import_excel = require('../../../func/import_excel.js');

//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	
//	console.log(f.arg.sql)
//	console.log("excel啊啊啊啊啊")
	
	if(f.arg.id == undefined){
		f.arg.sql = f.arg.sql + " limit 10000";
	}else{
		var zs = (f.arg.sql).split("order");
//		console.log(zs[0]);
		f.arg.sql = zs[0] + "and id in (" + f.arg.id + ")" + "order" + zs[1];
	}
	
//	f.arg.sql = f.arg.sql + " limit 100000 ";//查询数据库语句：select * from 平_会员表 where 昵称 = '定春' limit 100000
	
	
	sql = f.arg.sql;
	s = pgdb.query(pg, sql).数据//查询的所有数据，注意要[{},{},{}....]格式
	var result = import_excel.import(s);//调用接口会传入一个buffer
	//console.log(result)//打印下来是一串乱码
	f._isRander='1';
	f._isExcel = result; //这里把buffer传入这个变量中接收，主文件里res这个变量接收并进行处理
	/*
	 * 主文件里更改的操作
	 * res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	 * res.setHeader("Content-Disposition", "attachment; filename=" + body.date + "_" + body.startTime + ".xlsx"); //默认名 
	 * res.end(body.send._isExcel, 'binary'); //'binary'值必须 否则excel打不开
	 */
	return f;
}