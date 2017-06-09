//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.商品名称 != null && f.data.商品名称 != '') {
			where += " and 商品名称 = '" + f.data.商品名称 + "'";
		}
		if(f.data.商户号 != null && f.data.商户号 != '') {
			where += " and 商户号 = '" + f.data.商户号 + "'";
		}
		if(f.data.账号 != null && f.data.账号!= '') {
			where += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += " and 姓名 = '"+f.data.姓名+ "'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += " and 类别 = '"+f.data.类别+ "'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += " and 状态 = '"+f.data.状态+ "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
           p.sql = "select id from 平_账户类别表  where id = 0 ";
    }else*/
	p.sql = "select id, 产品类型, 商户号, 商品名称, round(实付金额, 2) as 实付金额, 账号, 姓名, 商户订单号, 交易订单号, 清算日期, 支付详细, 类别, 状态, 录入人, 录入时间 from 平_银联支付日志表  where "+ where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "银联支付日志",
		"模块": "adminfunc",
		"func": "yinlianzhifu",
		"页数": "10",
		"表名": "平_银联支付日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}