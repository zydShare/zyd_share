//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		if(f.data.状态 != null && f.data.状态 != '') {
			wh += " and 状态 = '" + f.data.状态 + "'";
		}
		if(f.data.账号 != null && f.data.账号 != '') {
			wh += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.真实名 != null && f.data.真实名 != '') {
			wh += " and 真实名  = '" + f.data.真实名 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
	}
	p.sql = "select id,唯一id,储存账户,账号,真实名,状态,类别,录入人,录入时间,备注  from 全_会员表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "会员表",
		"模块": "adminfunc",
		"func": "account",
		"页数": "10",
		"表名": "全_会员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}