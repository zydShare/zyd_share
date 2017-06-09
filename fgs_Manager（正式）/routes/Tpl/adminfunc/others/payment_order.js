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
		if(f.data.卡号 != null && f.data.卡号 != ''){
			where += "and 卡号 = '"+f.data.卡号+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.录入人 != null && f.data.录入人 != ''){
			where += "and 录入人 = '"+f.data.录入人+"'";
		}
		if(f.data.时间 != null && f.data.时间 != ''){
			where += "and 时间 = '"+f.data.时间+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		
	}
	p.sql = "select id,卡号,账号,时间,ip,类别,状态,内容,录入人,录入时间,备注  from 三_日志_钱表  where "+ where;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "日志钱表",
		"模块": "adminfunc",
		"func": "PaymentOrder",
		"页数": "10",
		"表名": "三_日志_钱表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}