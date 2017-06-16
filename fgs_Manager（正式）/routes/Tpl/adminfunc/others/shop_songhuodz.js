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
			where += "and 账号 = '"+f.data.账号+"'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += "and 姓名 = '"+f.data.姓名+"'";
		}
		if(f.data.省 != null && f.data.省 != ''){
			where += "and 省 = '"+f.data.省+"'";
		}
		if(f.data.市 != null && f.data.市  != ''){
			where += "and 市  = '"+f.data.市 +"'";
		}
		if(f.data.区 != null && f.data.区  != ''){
			where += "and 区  = '"+f.data.区 +"'";
		}
		if(f.data.地址 != null && f.data.地址 != ''){
			where += "and 地址 = '"+f.data.地址+"'";
		}
		if(f.data.手机号 != null && f.data.手机号 != ''){
			where += "and 手机号 = '"+f.data.手机号+"'";
		}
		if(f.data.发货人 != null && f.data.发货人 != ''){
			where += "and 发货人 = '"+f.data.发货人+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 = '"+f.data.状态+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
  		p.sql = "select id,账号,姓名,省,市,区,地址,手机号,发货人,状态,类别,录入人,录入时间,备注   from 商_发货地址表  where "+where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
//	console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "商品发货地址表",
		"模块": "adminfunc",
		"func": "shop_songhuodz",
		"页数": "10",
		"表名": "商_发货地址表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}