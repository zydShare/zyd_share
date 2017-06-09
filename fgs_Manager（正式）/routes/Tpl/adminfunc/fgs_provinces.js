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
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}

	}
	p.sql = "select id,省份,名称,状态,类别,录入人,录入时间,备注,客服 from 分_省份表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_省份",
		"模块": "adminfunc",
		"func": "fgs_provinces",
		"页数": "10",
		"表名": "分_省份表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}