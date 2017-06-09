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
	eval("f = " + f.arg._name + "(f, pg, mo);");
	return f;
}

function deleteClasses(f, pg, mo) {
	//var f._isRander = '提交成功';
	sql = "select 状态 from 商_商品收藏表 where id = '" + f.arg.id + "'";
	s = pgdb.query(pg, sql);
	if(s.数据[0].状态 != '已删除') {
		f._isRander = '状态必须为已删除';
		return f;
	} else {
		sql = "delete from 商_商品收藏表  where id = '" + f.arg.id + "' ";
		f.更 = pgdb.query(pg, sql);
	}

	f._isRander = '提交成功';
	return f;
}