//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	p.sql = "select id,账号,卡号,姓名,积分,余额,说明,状态,类别,录入人,录入时间  ,备注,反馈 from 三_账户表  where "+ where;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "账户表",
		"模块": "adminfunc",
		"func": "PictureList",
		"页数": "10",
		"表名": "三_账户表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}