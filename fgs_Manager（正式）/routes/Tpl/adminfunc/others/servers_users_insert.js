/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var serversusersupdate = require('./servers_users_update.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f._xhtml = 'Tpl/adminfunc/servers_users_update';
	serversusersupdate.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	serversusersupdate.form(f, pg, mo);
	return f;
}
