/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var log_insert = require('./fgs_log_basic_edit.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f._xhtml = 'Tpl/adminfunc/fgs_log_basic_edit';
	f = log_insert.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	f = log_insert.form(f, pg, mo);
	return f;
}
