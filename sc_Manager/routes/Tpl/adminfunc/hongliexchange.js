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
		if(f.data.账号 != null && f.data.账号 != ''){
			where += "and 标题 = '"+f.data.标题+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.录入人 != null && f.data.录入人 != ''){
			where += "and 录入人 = '"+f.data.录入人+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+" 00:00:00'";
		}
		if((f.data.最大时间 != null && f.data.最大时间 != '')||(f.data.最小时间 != null && f.data.最小时间 != '') ){
			wh += "and 录入时间 >= '"+f.data.最小时间+"' and 录入时间<='"+f.data.最大时间+"'";
		}
		
	}
	
	
	p.sql = "select id,账号,姓名, 类别, 状态,录入人,录入时间 ,说明,备注 from 三_黑名单表  where "+ where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "黑名单表",
		"模块": "adminfunc",
		"func": "hongliexchange",
		"页数": "10",
		"表名": "三_黑名单表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}