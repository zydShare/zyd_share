//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	//查询条件还没有
	if(f.data != null) {
		if(f.data.名称 != null && f.data.名称 != '') {
			 where += " and  名称 = '" + f.data.名称 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	
  		p.sql = "select id,优惠券设置id,名称,积分,拥有者账号,拥有者姓名,使用者账号,使用者姓名,使用时间,支付方式,状态,类别,录入人,录入时间,备注  from 平_优惠券表  where "+ where;
  
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "优惠券表",
		"模块": "adminfunc",
		"func": "shop_youhuiq",
		"页数": "10",
		"表名": "平_优惠券表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}