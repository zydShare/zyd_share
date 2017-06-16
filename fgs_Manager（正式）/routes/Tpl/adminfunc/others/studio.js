
var share = require('../admin/share.js');
var control = require('../../admin_control.js');

//后台列表 
module.exports.run = function(f, pg, mo) { 
	var p = {};
	f = control.index(f);
	f._json = this.json();
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.名称 != null && f.data.名称 != '') {
			where += " and  名称 = '" + f.data.名称 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			where += " and  录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			where += " and  录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}
	}
	p.sql = "select id,名称,简介,图片,开播时间,关播时间,状态,类别,录入人,录入时间,直播状态,头像 from 播_直播间表  where" + where;
	f = share.lists(p, f, pg);
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "直播间",
		"模块": "adminfunc",
		"func": "studio",
		"页数": "20",
		"表名": "播_直播间表",
		"编辑": "h",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}
