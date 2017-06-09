//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";

	if(f.data != null) {
		if(f.data.状态 != null && f.data.状态 != '') {
			where += " and 状态 = '" + f.data.状态 + "'";
		}
		if(f.data.id != null && f.data.id != '') {
			where += " and id = '" + f.data.id + "'";
		}
		if(f.data.账号 != null && f.data.账号 != '') {
			where += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != '') {
			where += " and 姓名 = '" + f.data.姓名 + "'";
		}
		if(f.data.套餐 != null && f.data.套餐 != '') {
			where += " and 套餐 = '" + f.data.套餐 + "'";
		}
		if(f.data.俱乐部名称 != null && f.data.俱乐部名称 != '') {
			where += " and 俱乐部名称 = '" + f.data.俱乐部名称 + "'";
		}
		if(f.data.类别 != null && f.data.类别 != '') {
			where += " and 类别 = '" + f.data.类别 + "'";
		}
		if(f.data.录入人 != null && f.data.录入人 != ''){
			where += "and 录入人 = '"+f.data.录入人+" '";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 <= '"+f.data.录入时间+" 23:59:59'";
		}
		
		
	}
	
	p.sql = "select id,套餐id,账号,姓名,卡号,支付方式,上级,上级姓名,套餐,面值,赠送,日返积分,总额,数量,支付订单号,俱乐部id,俱乐部名称,类别,状态,录入人,录入时间,内容,备注,支付时间,俱乐部申请id,社区代理分公司名称,市代理分公司名称,市代理分公司id,社区代理分公司id,商户订单号  from 全_开卡日志表  where "+where;
	//做一个判断引用哪个数据库，放到f里面
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "开卡日志表",
		"模块": "adminfunc",
		"func": "smrz",
		"页数": "10",
		"表名": "全_开卡日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}