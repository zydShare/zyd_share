//select id,一级分类名称,类别id,状态,录入人,录入时间,备注  from 商_一级分类表
/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_yijifenlei = require('./shop_yijifenlei.js');
//单条显示
//select id,类别名称,排序,图标,状态,录入人,录入时间,备注  from 商_商品类别表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_yijifenlei.json();
	p.表名 = '商_一级分类表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f, pg, mo) {
	//db = sqlite.connect();
	f._json = shop_yijifenlei.json();
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 商_一级分类表 set 一级分类名称='" + f.data.一级分类名称 + "',类别id='" + f.data.类别id + "',状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_一级分类表 (一级分类名称,类别id,状态,录入人,录入时间,备注) values ('" + f.data.一级分类名称 + "','" + f.data.类别id + "','" + f.data.状态 + "','" + f.session.user_name + "','" + f.date + "','" + f.data.备注 + "')";
	pgdb.query(pg, sql);
	return f;
}
