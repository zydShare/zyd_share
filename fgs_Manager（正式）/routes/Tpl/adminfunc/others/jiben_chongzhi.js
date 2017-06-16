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
		if(f.data.名称 != null && f.data.名称 != ''){
			where += " and  名称 = '" + f.data.名称 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += " and  状态 = '" + f.data.状态 + "'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += " and  类别 = '" + f.data.类别 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,名称,说明,面值,赠送,状态,类别,录入人,录入时间,备注,购买方式,最大面值,赠送百分比  from 平_基本充值套餐表  where " + where;
  	}else{*/
  		p.sql = "select id,名称,说明,round(面值, 2) as 面值,round(赠送, 2) as 赠送,状态,类别,录入人,录入时间,备注,购买方式,round(最大面值, 2) as 最大面值,round(赠送百分比, 2) as 赠送百分比  from 平_基本充值套餐表  where " + where;  	
	//}
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	//console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "基本充值套餐",
		"模块": "adminfunc",
		"func": "jiben_chongzhi",
		"页数": "10",
		"表名": "平_基本充值套餐表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}