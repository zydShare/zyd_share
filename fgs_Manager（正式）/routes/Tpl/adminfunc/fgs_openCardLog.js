//已经是同步的，用异步写也会同步执行
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
		if(f.data.姓名 != null && f.data.姓名 != ''){
			wh += "and 姓名 >= '"+f.data.姓名+"'";
		}
		if(f.data.卡号 != null && f.data.卡号 != ''){
			wh += "and 卡号 >= '"+f.data.卡号+"'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			wh += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
		
		
		
	}
	p.sql = "select id,套餐id,账号,姓名,卡号,支付方式,上级,上级姓名,套餐,面值,赠送,日返积分,总额,数量,支付订单号,类别,状态,录入人,录入时间,内容,备注,支付时间,社区代理分公司名称,市代理分公司名称,市代理分公司id,社区代理分公司id,商户订单号 from 分_开卡日志表  where"+wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_开卡日志",
		"模块": "adminfunc",
		"func": "fgs_openCardLog",
		"页数": "10",
		"表名": "分_开卡日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}