//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		if(f.data.id != null && f.data.id != '') {
			wh += " and id = '" + f.data.id + "'";
		}
		if(f.data.订单id != null && f.data.订单id != '') {
			wh += " and 订单id = '" + f.data.订单id + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}

	}
	p.sql = "select id,订单id,录入时间 from 分_并发处理表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_并发处理",
		"模块": "adminfunc",
		"func": "fgs_defend_concurrent",
		"页数": "10",
		"表名": "分_并发处理表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}