﻿//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		if(f.data.名称 != null && f.data.名称 != '') {
			wh += " and 名称 = '" + f.data.名称 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != '') {
			wh += " and 姓名  = '" + f.data.姓名 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
		
		
		
	}
	p.sql = "select id,账号,姓名,名称,地址,排序,股数,层1分公司名称,层1分公司id,层2分公司名称,层2分公司id,层3分公司名称,层3分公司id,编号,定时时间,省,市,区,分公司密码,总账户,分红账户,回流账户,分公司设置id,状态,类别,录入人,录入时间,备注 from 分_分公司表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_分公司",
		"模块": "adminfunc",
		"func": "fgs_branchCompany",
		"页数": "10",
		"表名": "分_分公司表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}