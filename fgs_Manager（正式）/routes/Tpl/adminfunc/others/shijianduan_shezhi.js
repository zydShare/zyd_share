﻿//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	//查询条件还没有
	if(f.data != null) {
		if(f.data.白名单 != null && f.data.白名单 != ''){
			where += " and  白名单 = '" + f.data.白名单 + "'";
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
         p.sql = "select id,最小时间,最大时间,积分,相隔分钟,状态,类别,录入人,录入时间,备注,白名单  from 平_时间段设置表  where "+ where;
  	}else{*/
  		p.sql = "select id,最小时间,最大时间,round(积分, 2) as 积分,相隔分钟,状态,类别,录入人,录入时间,备注,白名单  from 平_时间段设置表  where "+ where;
  	//}	
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "时间段设置",
		"模块": "adminfunc",
		"func": "shijianduan_shezhi",
		"页数": "10",
		"表名": "平_时间段设置表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}