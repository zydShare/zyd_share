/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');

//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	//f = deleteOne(f, pg, mo);
	if(f.isPower == true){
		eval("f = "+f.arg._name+"(f, pg, mo);");	
	}else{
		f._isRander = '无此权限';
	}
	
	return f;
}

function deleteClasses(f, pg, mo) {
	//var f._isRander = '提交成功';
	sql = "delete from 商_供货商表 where id in (" + f.arg.id + ") ";
	s = pgdb.query(pg, sql);
	
	var p = {};
	p.类别 = '删除类别';
	p.明细 = '';
	var shop_gonghuoshang=require('./shop_gonghuoshang.js');
	f._json=shop_gonghuoshang.json();
	share.logs(p,f);
	f._isRander = '提交成功';
	return f;
}
