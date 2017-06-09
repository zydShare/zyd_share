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
		if(f.data.id != null && f.data.id != ''){
			where += " and  id = '" + f.data.id + "'";
		}
		if(f.data.账号 != null && f.data.账号 != ''){
			where += " and  账号 = '" + f.data.账号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += " and  姓名 = '" + f.data.姓名 + "'";
		}
		if(f.data.商品id != null && f.data.商品id != ''){
			where += " and  商品id = '" + f.data.商品id + "'";
		}
		if(f.data.商品名称 != null && f.data.商品名称 != ''){
			where += " and  商品名称 = '" + f.data.商品名称 + "'";
		}
		if(f.data.商品规格 != null && f.data.商品规格 != ''){
			where += " and  商品规格 = '" + f.data.商品规格 + "'";
		}
		if(f.data.商品数量 != null && f.data.商品数量 != ''){
			where += " and  商品数量 = '" + f.data.商品数量 + "'";
		}
		if(f.data.商家账号 != null && f.data.商家账号 != ''){
			where += " and  商家账号 = '" + f.data.商家账号 + "'";
		}
		if(f.data.商家姓名 != null && f.data.商家姓名 != ''){
			where += " and  商家姓名 = '" + f.data.商家姓名 + "'";
		}		
		if(f.data.店铺名 != null && f.data.店铺名 != ''){
			where += " and  店铺名 = '" + f.data.店铺名 + "'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += " and  类别 = '" + f.data.类别 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += " and  状态 = '" + f.data.状态 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
  		p.sql = "select id,账号,姓名,商品id,商品名称,商品规格,round(商品数量, 2) as 商品数量,round(单价, 2) as 单价,round(快递费, 2) as 快递费,商家账号,商家姓名,店铺名,类别,状态,录入人,录入时间  from 商_购物车表  where "+ where;
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "商_购物车",
		"模块": "adminfunc",
		"func": "shop_gouwuche",
		"页数": "10",
		"表名": "商_购物车表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}