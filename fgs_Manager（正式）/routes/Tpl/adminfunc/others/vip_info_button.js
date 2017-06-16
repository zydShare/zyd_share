/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	//f = deleteOne(f, pg, mo);
	//	if(f.isPower == true){
	//		eval("f = "+f.arg._name+"(f, pg, mo);");	
	//	}else{
	//		f._isRander = '无此权限';
	//	}
	f = control.index(f);
	eval("f = " + f.arg._name + "(f, pg, mo);");
	return f;
}
//eval("f = "+f.arg._name+"(f, pg, mo);");	

/*
 * 重置密码
 */
function updatepwd(f, pg, mo) {
	//重定向
	var sql = "update 平_会员表  set 登录密码 = 'e10adc3949ba59abbe56e057f20f883e' where id ='" + f.arg.id + "'";
	f.r = pgdb.query(pg, sql);
	f._isRander = '提交成功';
	return f;
}

function deleteClasses(f, pg, mo) {
	var sql = "select 账号 from 平_会员表  where id = " + f.arg.id;
	var 账号 = pgdb.query(pg, sql).数据[0].账号;

	sql2 = "delete from 平_会员表  where id = " + f.arg.id;
	pgdb.query(pg, sql2);
	sql3 = "delete from 平_会员资料表  where 账号 ='" + 账号 + "' ";
	pgdb.query(pg, sql3);
	f._isRander = '提交成功';
	return f;
}