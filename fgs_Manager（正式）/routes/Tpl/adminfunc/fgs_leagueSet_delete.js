/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	//f = deleteOne(f, pg, mo);
	eval("f = " + f.arg._name + "(f, pg, mo);");
	return f;
}

function deleteClasses(f, pg, mo) {
	//var f._isRander = '提交成功';
	sql = "delete from 分_加盟设置表  where id in (" + f.arg.id + ") ";
	s = pgdb.query(pg, sql);

	f._isRander = '提交成功';
	return f;
}