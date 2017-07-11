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
		if(f.data.录入时间 != null && f.data.录入时间 != '') {
			wh += "and 录入时间 >= '" + f.data.录入时间 + "'";
		}

		if(f.data.状态 != null && f.data.状态 != '') {
			wh = " 状态 LIKE '%" + f.data.状态 + "%'";
		}
		if(f.data.类别 != null && f.data.类别 != '') {
			wh = " 类别 LIKE '%" + f.data.类别 + "%'";
		}


	}
	p.sql = "select id,名称,显示名称,加盟费,日返积分,赠送积分,类别,状态,录入人,录入时间 from 分_加盟设置表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_加盟设置",
		"模块": "adminfunc",
		"func": "fgs_leagueSet",
		"页数": "10",
		"表名": "分_加盟设置表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}