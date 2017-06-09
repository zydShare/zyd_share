//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	p.sql = "select id, round(应结积分, 2) as 应结积分, round(实结积分, 2) as 实结积分, 订单状态, 审核人, 审核时间, 录入人, 录入时间,备注  from 商_奖金结算表  where " + where;
	f = share.lists(p, f, pg);
	if(f.arg._ms_main != 'no') {
		f._xhtml = 'Tpl/admin/master_slave';
	}
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "奖金结算",
		"模块": "adminfunc",
		"func": "bonus_settlement_detail",
		"页数": "10",
		"表名": "商_奖金结算表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通",
		"主从编辑": [{
			"id": 34,
			"名称": "奖金明细表",
			"func": "bonus_settlement_detail",
			"n1": "结算单号",
			"n2": "id"
		}]
	};
	return json;
}