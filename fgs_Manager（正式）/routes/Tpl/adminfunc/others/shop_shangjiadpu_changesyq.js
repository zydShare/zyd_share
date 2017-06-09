//select id,一级分类名称,类别id,状态,录入人,录入时间,备注  from 商_一级分类表
/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_shangjiadpu = require('./shop_shangjiadpu.js');
//单条显示
//select id,类别名称,排序,图标,状态,录入人,录入时间,备注  from 商_商品类别表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_shangjiadpu.json();
	f._json.名称 = '更改试用期'; 
	p.表名 = '商_商家店铺表';
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
	f._json = shop_shangjiadpu.json();
	var sql = '';
	//更改
	if(f.data.id != ''){
		sql = "update 商_商家店铺表 set  创建时间='" + f.date + "',试用期='" +f.data.试用期+ "' where id = " + f.data.id;
	    f.更新信息 = pgdb.query(pg, sql);
	}
	return f;
}
