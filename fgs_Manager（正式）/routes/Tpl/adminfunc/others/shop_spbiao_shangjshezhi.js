/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_spbiao = require('./shop_spbiao.js')
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_spbiao.json();
	p.表名 = '商_商品表';
	f = share.update(p, f, pg);
	//console.log(f);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */
//select id,账号,省,市,区,地址,手机号,收货人,状态,类别,录入人,录入时间  from 商_送货地址表  where
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = shop_spbiao.json();
	var sql = '';
if(f.data.id!=''){
	sql = "update 商_商品表  set 首页='"+f.data.首页+"',特卖='"+f.data.特卖+"',精品='"+f.data.精品+"',特价='"+f.data.特价+"',录入人='"+f.session.user_name+"',录入时间 = '"+f.date+"' where id ='"+f.data.id+"'";
	pgdb.query(pg,sql);
}
	
	return f;
}



