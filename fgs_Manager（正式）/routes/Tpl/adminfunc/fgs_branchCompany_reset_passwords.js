/*
 * 重置分公司密码
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var cipher = require('../../../func/cipher.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	eval("f = " + f.arg._name + "(f, pg, mo);");
	return f;
}

function reset_passwords(f, pg, mo) {
	sql = "select 编号   from 分_分公司表  where id in (" + f.arg.id + ") ";
	s = pgdb.query(pg, sql);
//	console.log(s)
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	var new_password = cipher.md5(s.数据[0].编号.slice(-6));
//	console.log(new_password);
	sql = "update 分_分公司表 set 分公司密码= '"+ new_password +"' where id in (" + f.arg.id + ") ";
	
	s = pgdb.query(pg, sql);
//	console.log(s)
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
	
	f._isRander = '提交成功';
	return f;
}