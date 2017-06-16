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
			where += "and id like '%"+f.data.id+"%'";
		}
		if(f.data.账号 != null && f.data.账号 != ''){
			where += "and 账号 = '"+f.data.账号+"'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += "and 姓名 = '"+f.data.姓名+"'";
		}
		if(f.data.套餐 != null && f.data.套餐 != ''){
			where += "and 套餐 like '"+f.data.套餐+"'";
		}
		if(f.data.录入人 != null && f.data.录入人 != ''){
			where += "and 录入人 = '"+f.data.录入人+"'";
		}
		if(f.data.账号类别 != null && f.data.账号类别 != ''){
			where += "and 账号类别= '"+f.data.账号类别+"'";
		}
		
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 like '%"+f.data.状态+"%'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		
	}
	//默认查询所有的数据
         p.sql = "select id,账号,姓名,应发积分,开卡id,套餐,支付方式,状态,类别,录入人,录入时间,备注,卡号,卡姓名,数量,账号类别,当时类别   from 三_奖金日志表  where " + where;
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
		"名称": "奖金日志表",
		"模块": "adminfunc",
		"func": "token",
		"页数": "10",
		"表名": "三_奖金日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}