/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var shop_sp = require('./shop_spbiao_update.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f._xhtml = 'Tpl/adminfunc/shop_spbiao_update';
	 shop_sp.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	shop_sp.form(f, pg, mo);
	return f;
}
