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
		if(f.data.姓名 != null && f.data.姓名 != '') {
			wh += " and 姓名  = '" + f.data.姓名 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
		
		
		
	}
	p.sql = "select id,账号,姓名,应发积分,实发积分,开卡id,套餐,支付方式,状态,类别,录入人,录入时间,卡号,卡姓名,数量,账号类别,当时类别,备注 from 分_基本日志表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_基本日志",
		"模块": "adminfunc",
		"func": "fgs_log_basic",
		"页数": "10",
		"表名": "分_基本日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}