/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop = require('./shop_shangjiadpu.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop.json();
	f._json.名称 = '审核';
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
	console.log(f.data);
	//更改
	f._json = shop.json();

	sql = "select 店铺验证  from 商_商家店铺表 where id=" + f.data.id;
	a = pgdb.query(pg, sql);

	if(a.数据[0].店铺验证 == '1') {
		if(f.data.认证 == '失败') {
			sql = "update 商_商家店铺表 set 店铺验证='0' where id = " + f.data.id;
		} else {
			sql = "update 商_商家店铺表 set 店铺验证='2' where id = " + f.data.id;
		}
		pgdb.query(pg, sql);
	} else {
		f._状态 = '不是审核中，不能进行审核';
	}
	//sqlite.close(db);

	return f;
}