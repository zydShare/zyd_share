//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		if(f.data.卡号 != null && f.data.卡号 != '') {
			wh += " and 卡号 = '" + f.data.卡号 + "'";
		}
		if(f.data.账号 != null && f.data.账号 != ''){
			wh += "and 账号 >= '"+f.data.账号+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}

	}
	p.sql = "select id,卡号,账号,时间,ip,类别,状态,内容,录入人,录入时间,备注 from 分_日志_非钱表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_日志_非钱",
		"模块": "adminfunc",
		"func": "fgs_notMoneyLog",
		"页数": "10",
		"表名": "分_日志_非钱表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}