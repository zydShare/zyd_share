/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_shuxing = require('./shop_shuxing.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_shuxing.json();
	p.表名 = '商_属性表';
	f = share.update(p, f, pg);
	return f;
}

/*
 *添加新的商品属性
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = shop_shuxing.json();

	var sql = "insert into 商_属性表(颜色,尺寸,规格,库存,商品id,状态,录入人,录入时间,备注) values('" + f.data.颜色 + "','" + f.data.尺寸 + "','" + f.data.规格 + "','" + f.data.库存 + "','" + f.data.商品id + "','" + f.data.状态 + "','" + f.session.user_name + "','" + f.date + "','" + f.data.备注 + "')"
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败'
		return f;
	}
	return f;
}