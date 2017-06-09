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
	//eval("f = " + f.arg._name + "(f, pg, mo);");
	if(f.isPower == true){
		eval("f = "+f.arg._name+"(f, pg, mo);");	
	}else{
		f._isRander = '无此权限';
	}
	return f;
}

function deleteClasses(f, pg, mo) {
	//var f._isRander = '提交成功';
	sql = "delete from 商_奖金结算明细表  where id in (" + f.arg.id + ") ";
	pgdb.query(pg, sql);
	var p = {};
	p.类别 = '删除明细';
	var bouns = require('./bonus_settlement_detail.js');
	f._json = bouns.json();
	share.logs(p,f);
	f._isRander = '提交成功';
	return f;
}
