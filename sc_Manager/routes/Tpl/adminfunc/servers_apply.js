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
		if(f.data.套餐名称 != null && f.data.套餐名称 != ''){
			where += "and 套餐名称 = '"+f.data.套餐名称+"'";
		}
		if(f.data.账号 != null && f.data.账号 != ''){
			where += "and 账号 = '"+f.data.账号+"'";
		}
		if(f.data.手机号 != null && f.data.姓名 != ''){
			where += "and 姓名 = '"+f.data.姓名+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 = '"+f.data.状态+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		if((f.data.最大时间 != null && f.data.最大时间 != '')||(f.data.最小时间 != null && f.data.最小时间 != '') ){
			where += "and 录入时间 >= '"+f.data.最小时间+"' and 录入时间<='"+f.data.最大时间+"'";
		}
		
	}
	//默认查询所有的数据
  		p.sql = "select id,套餐名称,卡号,账号,姓名,手机号,消费账户,赠送积分,面值,日返还积分,上次返还时间,状态,类别,录入人,录入时间,备注,数量,次数,年月  from 三_全返套餐表  where "+where;
  	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "全返套餐表",
		"模块": "adminfunc",
		"func": "servers_apply",
		"页数": "10",
		"表名": "三_全返套餐表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}