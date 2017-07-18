//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=0 ";
	if(f.data != null) {
		if(f.data.账号 != null && f.data.账号 != '') {
			wh = " 账号 LIKE '%" + f.data.账号 + "%'";
		}
		
//		if(f.data.开始日期 != null && f.data.开始日期 != '') {
//			wh += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
//		}
//		if(f.data.结束日期 != null && f.data.结束日期 != '') {
//			wh += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
//		}

//		if(f.data.查询 != null && f.data.查询 != '') {
//			wh = "(账号 like'%" + f.data.查询 + "%')" +
//				"or (类别 like'%" + f.data.查询 + "%')" +
//				"or (姓名 like'%" + f.data.查询 + "%')" +
//				"or (当时类别 like'%" + f.data.查询 + "%')" +
//				"or (卡号 like'%" + f.data.查询 + "%')" +
//				"or (卡姓名 like'%" + f.data.查询 + "%')" +
////				"or (应发积分 like'%" + f.data.查询 + "%')" +
////				"or (实发积分 like'%" + f.data.查询 + "%')" +
//				"or (开卡id like'%" + f.data.查询 + "%')" +
////				"or (数量 like'%" + f.data.查询 + "%')" +
//				"or (套餐 like'%" + f.data.查询 + "%')" +
//				"or (支付方式 like'%" + f.data.查询 + "%')" +
//				"or (状态 like'%" + f.data.查询 + "%')" +
//				"or (录入人 like'%" + f.data.查询 + "%')" +
//				"or (录入时间 like'%" + f.data.查询 + "%')"
//		}

	}
	p.sql = "select id,账号,类别,姓名,当时类别,卡号,卡姓名,应发积分,实发积分,开卡id,数量,套餐,支付方式,状态,录入人,录入时间 from 分_奖金日志表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分公司奖金日志",
		"模块": "adminfunc",
		"func": "fgs_bonus_log",
		"页数": "10",
		"表名": "分_奖金日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}