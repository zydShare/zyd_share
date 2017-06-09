/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shuomingbiao = require('./shop_shuomingbiao.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shuomingbiao.json();
	p.表名 = '平_说明表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}


var pgdb = require('../../../func/pgdb.js');
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
module.exports.form = function(f, pg, mo) {
	f._json = shuomingbiao.json();
	var sql = "update 平_说明表  set 内容='"+f.data.内容+"' where id = '"+f.data.id+"'";
	pgdb.query(pg, sql);
	return f;
}

module.exports.json = function() {
	var json = {
		"名称": "平_说明表",
		"模块": "adminfunc",
		"func": "shop_shuomingbiao",
		"页数": "10",
		"表名": "平_说明表"
	};
	return json;
}