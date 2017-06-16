/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_shenjitaocanddb = require('./shop_shenjitaocanddb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_shenjitaocanddb.json();
	p.表名 = '商_升级套餐订单表';
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
	f._json = shop_shenjitaocanddb.json();
	//db = sqlite.connect();
	var sql = '';

	//更改
	if(f.data.id != '')
		var sql = "update 商_升级套餐订单表  set 账号='"+f.data.账号+"',姓名='"+f.data.姓名+"',类别='"+f.data.类别+"',升级套餐='"+f.data.升级套餐+"',支付方式='"+f.data.支付方式+"',支付时间='"+f.data.支付时间+"',支付订单号='"+f.data.支付订单号+"',状态='"+f.data.状态+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"'  where id = '"+f.data.id+"'";
	else if(f.data.id == '')
		var sql = "insert into 商_升级套餐订单表(账号,姓名,类别,升级套餐,支付方式,支付时间,支付订单号,状态,录入人,录入时间,备注) values('"+f.data.账号+"','"+f.data.姓名+"','"+f.data.类别+"','"+f.data.升级套餐+"','"+f.data.支付方式+"','"+f.data.支付时间+"','"+f.data.支付订单号+"','"+f.data.状态+"','"+f.session.user_name+"','"+f.date+"','"+f.data.备注+"')"
		s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }
	//sqlite.close(db);
	return f;
}
