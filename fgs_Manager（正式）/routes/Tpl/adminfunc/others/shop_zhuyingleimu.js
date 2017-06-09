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
	f._json.名称 = '编辑主营类目';
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
	//更改
	f._json = shop.json();
	sql = "update 商_商家店铺表 set  主营类别='" + f.data.主营类别 + "' where id = " + f.data.id;
	f.更 = pgdb.query(pg, sql);
	//sqlite.close(db);
	return f;
}
