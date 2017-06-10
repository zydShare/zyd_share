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
			where += "and 名称 = '"+f.data.名称+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		if((f.data.最大时间 != null && f.data.最大时间 != '')||(f.data.最小时间 != null && f.data.最小时间 != '') ){
			where += "and 录入时间 >= '"+f.data.最小时间+"' and 录入时间<='"+f.data.最大时间+"'";
		}
		
	}
	//默认查询所有的数据
	
        p.sql = "select id,名称,录入时间   from 三_批检表  where " + where;
	//做一个判断引用哪个数据库，放到f里面
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "批检表",
		"模块": "adminconfunc",
		"func": "servers",
		"页数": "10",
		"表名": "三_批检表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}