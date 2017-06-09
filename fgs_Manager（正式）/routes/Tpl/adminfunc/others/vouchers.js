//已经是同步的,用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	//查询条件还没有
	if(f.data != null) {
		if(f.data.id != null && f.data.id != ''){
			where += "and id = '"+f.data.id+"'";
		}
		if(f.data.名称 != null && f.data.名称 != ''){
			where += "and 名称 = '"+f.data.名称+"'";
		}
		if(f.data.俱乐部id != null && f.data.俱乐部id != ''){
			where += "and 俱乐部id = '"+f.data.俱乐部id+"'";
		}
		if(f.data.代金券设置id != null && f.data.代金券设置id != ''){
			where += "and 代金券设置id = '"+f.data.代金券设置id+"'";
		}
		if(f.data.俱乐部名称 != null && f.data.俱乐部名称 != ''){
			where += "and 俱乐部名称 = '"+f.data.俱乐部名称+"'";
		}
		if(f.data.拥有者账号 != null && f.data.拥有者账号 != ''){
			where += "and 拥有者账号 = '"+f.data.拥有者账号+"'";
		}
		if(f.data.拥有者姓名 != null && f.data.拥有者姓名 != ''){
			where += "and 拥有者姓名 = '"+f.data.拥有者姓名+"'";
		}
		if(f.data.使用者账号 != null && f.data.使用者账号 != ''){
			where += "and 使用者账号 = '"+f.data.使用者账号+"'";
		}
		if(f.data.使用者姓名 != null && f.data.使用者姓名 != ''){
			where += "and 使用者姓名 = '"+f.data.使用者姓名+"'";
		}
		if(f.data.支付方式 != null && f.data.支付方式 != ''){
			where += "and 支付方式 = '"+f.data.支付方式+"'";
		}
		if(f.data.支付订单号 != null && f.data.支付订单号 != ''){
			where += "and 支付订单号 = '"+f.data.支付订单号+"'";
		}
		if(f.data.使用编号 != null && f.data.使用编号 != ''){
			where += "and 使用编号 = '"+f.data.使用编号+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 = '"+f.data.状态+"'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			where += " and  录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			where += " and  录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}
	}
	//默认查询所有的数据
	
  		p.sql = "select id,代金券设置id,名称,俱乐部名称,俱乐部id,拥有者账号,拥有者姓名,使用者账号,使用者姓名,round(积分, 2) as 积分,使用时间,支付方式,支付订单号,状态,类别,录入人,录入时间,使用编号,使用期限  from 平_代金券表  where "+where;
  	
	//做一个判断引用哪个数据库,放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	//console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "代金券",
		"模块": "adminfunc",
		"func": "vouchers",
		"页数": "10",
		"表名": "平_代金券表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}