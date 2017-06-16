/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var apply_insert = require('./fgs_branchCompany_apply_edit.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f._xhtml = 'Tpl/adminfunc/fgs_branchCompany_apply_edit';
	f = apply_insert.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	f = apply_insert.form(f, pg, mo);
	return f;
}
