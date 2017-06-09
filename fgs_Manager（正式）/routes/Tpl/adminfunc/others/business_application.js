//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";

	if(f.data != null) {
		if(f.data.姓名 != null && f.data.姓名 != '') {
			where += " and 姓名 = '" + f.data.姓名 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != '') {
			where += " and 状态  = '" + f.data.状态 + "'";
		}
		if(f.data.手机号 != null && f.data.手机号 != '') {
			where += " and 手机号 = '" + f.data.手机号 + "'";
		}
		if(f.data.支付时间 != null && f.data.支付时间 != '') {
			where += " and 支付时间  = '" + f.data.支付时间 + "'";
		}
		if(f.data.支付方式 != null && f.data.支付方式 != '') {
			where += " and 支付方式 = '" + f.data.支付方式 + "'";
		}
		if(f.data.支付订单号 != null && f.data.支付订单号 != '') {
			where += " and 支付订单号  = '" + f.data.支付订单号 + "'";
		}
		if(f.data.俱乐部id != null && f.data.俱乐部id != '') {
			where += " and 俱乐部id = '" + f.data.俱乐部id + "'";
		}
		if(f.data.俱乐部名称 != null && f.data.俱乐部名称 != '') {
			where += " and 俱乐部名称  = '" + f.data.俱乐部名称 + "'";
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
	p.sql = "select id, 唯一id, 姓名, 手机号, 支付时间, round(加盟费,2) as 加盟费, 商家id, 商家名, 层1账号, 层1姓名, 上级类别, 俱乐部id, 俱乐部名称, 分公司编号, 分公司名称,  支付方式, 支付订单号, 状态, 录入人, 录入时间  from 商_商家申请表  where "+where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "商家申请",
		"模块": "adminfunc",
		"func": "business_application",
		"页数": "10",
		"表名": "商_商家申请表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}