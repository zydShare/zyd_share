/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = this.json();
	//p.表名 = '商_订单销售表';
  	p.sql = "select id,账号,姓名,商品id,收货人,收货地址,收货人手机号,类别,状态,收货方式,支付方式,round(实付金额, 2) AS 实付金额,ROUND(快递费,2) AS 快递费,商家姓名,商家账号,订单id,快递公司,快递单号,ROUND(商品数量, 0) AS 商品数量,店铺名,商品名称,商品规格,订单编号,ROUND(供货价, 2) AS 供货价,ROUND(市场价, 2) AS 市场价,ROUND(利润, 2) AS 利润,ROUND(总利润, 2) AS 总利润,ROUND(供货总价, 2) AS 供货总价,ROUND(市场总价, 2) AS 市场总价,ROUND(折扣, 2) AS 折扣,店铺id,类型,录入人,录入时间,支付订单号,支付时间,签名,预支付标识,商户订单号   from 商_订单销售表 where id ="+f.arg.id;
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');
//更改订单销售
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	var sql = "update 商_订单销售表  set 账号='"+f.data.账号+"',姓名='"+f.data.姓名+"',商品id='"+f.data.商品id+"',商品名称='"+f.data.商品名称+"',商品规格='"+f.data.商品规格+"',商品数量='"+f.data.商品数量+"',供货价='"+f.data.供货价+"',供货总价='"+f.data.供货总价+"',市场价='"+f.data.市场价+"',市场总价='"+f.data.市场总价+"',利润='"+f.data.利润+"',总利润='"+f.data.总利润+"',快递费='"+f.data.快递费+"',折扣='"+f.data.折扣+"',实付金额='"+f.data.实付金额+"',商家账号='"+f.data.商家账号+"',商家姓名='"+f.data.商家姓名+"',订单编号='"+f.data.订单编号+"',店铺id='"+f.data.店铺id+"',店铺名='"+f.data.店铺名+"',订单id='"+f.data.订单id+"',支付方式='"+f.data.支付方式+"',支付时间='"+f.data.支付时间+"',支付订单号='"+f.data.支付订单号+"',收货人='"+f.data.收货人+"',收货地址='"+f.data.收货地址+"',收货人手机号='"+f.data.收货人手机号+"',快递公司='"+f.data.快递公司+"',快递单号='"+f.data.快递单号+"',商户订单号='"+f.data.商户订单号+"',状态='"+f.data.状态+"',类型='"+f.data.类型+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"'  where id = '"+f.data.id+"'";
	s = pgdb.query(pg, sql);
	if(s.状态 =='失败'){
		f._状态 = '数据错误';
	};
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "订单销售表",
		"模块": "adminfunc",
		"func": "shop_dingdanxiaoshou",
		"页数": "10",
		"表名": "商_订单销售表"
	};
	return json;
}

