/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var ReturnIntegralUpdate = require('./return_integral_update.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f._xhtml = 'Tpl/adminfunc/return_integral_update';
	f = ReturnIntegralUpdate.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	f = ReturnIntegralUpdate.form(f, pg, mo);
	return f;
}
