//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	if(f.data != null) {
		if(f.data.环游购唯一id != null && f.data.环游购唯一id != ''){
			where += "and 标题 = '"+f.data.标题+"'";
		}
		if(f.data.账号 != null && f.data.账号 != ''){
			where += "and 类别 = '"+f.data.账号+"'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += "and 录入人 = '"+f.data.姓名+"'";
		}
		if(f.data.环游购账号 != null && f.data.环游购账号 != ''){
			where += "and 环游购账号 = '"+f.data.环游购账号+"'";
		}
		if(f.data.迁移时间 != null && f.data.迁移时间 != ''){
			where += "and 迁移时间 >= '"+f.data.迁移时间+" 00:00:00'";
		}
		if(f.data.迁移类别 != null && f.data.迁移类别 != ''){
			where += "and 迁移类别 = '"+f.data.迁移类别+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 类别 = '"+f.data.状态+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 录入人 = '"+f.data.类别+"'";
		}
		if(f.data.录入人 != null && f.data.录入人 != ''){
			where += "and 录入人 = '"+f.data.录入人+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		if(f.data.备注 != null && f.data.备注 != ''){
			where += "and 录入人 = '"+f.data.备注+"'";
		}
		if((f.data.最大时间 != null && f.data.最大时间 != '')||(f.data.最小时间 != null && f.data.最小时间 != '') ){
			where += "and 录入时间 >= '"+f.data.最小时间+"' and 录入时间<='"+f.data.最大时间+"'";
		}
		
	}
	p.sql = "select 环游购唯一id,账号,姓名,环游购账号,迁移时间,迁移类别,状态,类别,录入人,录入时间,备注,id from 三_迁移日志表  where "+ where;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "迁移日志表",
		"模块": "adminfunc",
		"func": "remove_log",
		"页数": "10",
		"表名": "三_迁移日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}