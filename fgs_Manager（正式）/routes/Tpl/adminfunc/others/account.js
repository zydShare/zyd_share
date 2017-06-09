//已经是同步的，用异步写也会同步执行
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
		if(f.data.真实名 != null && f.data.真实名 != '') {
			wh += " and 真实名  = '" + f.data.真实名 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
		
		
		
	}
	p.sql = "select id,名称,股数,单股金额,提成积分,协议,创建数量,全球提成,七大提成,上级提成,每股赠送个数,类别,状态,录入人,录入时间,说明,备注  from 分_分公司设置表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_分公司设置表",
		"模块": "adminfunc",
		"func": "account",
		"页数": "10",
		"表名": "分_分公司设置表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}