﻿//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		if(f.data.账号 != null && f.data.账号 != '') {
			wh += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.卡号 != null && f.data.卡号 != '') {
			wh += " and 卡号 = '" + f.data.卡号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != '') {
			wh += "and 姓名 >= '" + f.data.姓名 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != '') {
			wh += "and 录入时间 >= '" + f.data.录入时间 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != '') {
			wh = " 状态 LIKE '%" + f.data.状态 + "%'";
		}
		if(f.data.类别 != null && f.data.类别 != '') {
			wh = " 类别 LIKE '%" + f.data.类别 + "%'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			wh += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			wh += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}

	}
	p.sql = "select id,账号,卡号,姓名,积分,余额,说明,状态,类别,录入人,录入时间,备注,反馈 from 分_账户表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分公司个人账户",
		"模块": "adminfunc",
		"func": "fgs_notMoneyLog",
		"页数": "10",
		"表名": "分_账户表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}