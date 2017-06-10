//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.状态 != null && f.data.状态 != '') {
			where += " and 状态 = '" + f.data.状态 + "'";
		}
		if(f.data.账号 != null && f.data.账号 != '') {
			where += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != '') {
			where += " and 姓名  = '" + f.data.姓名 + "'";
		}
		if(f.data.录入人 != null && f.data.录入人 != '') {
			where += " and 录入人  = '" + f.data.录入人 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
		if((f.data.最大时间 != null && f.data.最大时间 != '')||(f.data.最小时间 != null && f.data.最小时间 != '') ){
			where += "and 录入时间 >= '"+f.data.最小时间+"' and 录入时间<='"+f.data.最大时间+"'";
		}
		
		
	}
	p.sql = "select id,账号,姓名, 类别, 状态,录入人,录入时间 ,说明,备注 from 三_白名单表  where "+ where;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "白名单表",
		"模块": "adminfunc",
		"func": "BatchWithdrawal",
		"页数": "10",
		"表名": "三_白名单表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}