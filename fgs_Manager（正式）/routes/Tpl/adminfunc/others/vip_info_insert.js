/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var user = require('./vip_info.js');
var vip_info_bianji=require('./vip_info_bianji.js');
var control = require('../../admin_control.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = user.json();	
	f._xhtml = 'Tpl/adminfunc/vip_info_bianji';
	 vip_info_bianji.run(f, pg, mo);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

module.exports.form = function(f, pg, mo) {
	vip_info_bianji.form(f, pg, mo);
	return f;
}
