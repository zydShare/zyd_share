//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		//		if(f.data.账号 != null && f.data.账号 != '') {
		//			wh += " and 账号 = '" + f.data.账号 + "'";
		//		}
		//		if(f.data.姓名 != null && f.data.姓名 != '') {
		//			wh += "and 姓名 >= '" + f.data.姓名 + "'";
		//		}
		//		if(f.data.卡号 != null && f.data.卡号 != '') {
		//			wh += "and 卡号 >= '" + f.data.卡号 + "'";
		//		}
		//		if(f.data.录入时间 != null && f.data.录入时间 != '') {
		//			wh += "and 录入时间 >= '" + f.data.录入时间 + "'";
		//		}
		//
		//		if(f.data.状态 != null && f.data.状态 != '') {
		//			wh = " 状态 LIKE '%" + f.data.状态 + "%'";
		//		}
		//		if(f.data.类别 != null && f.data.类别 != '') {
		//			wh = " 类别 LIKE '%" + f.data.类别 + "%'";
		//		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			wh += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			wh += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}
		if(f.data.查询 != null && f.data.查询 != '') {
			wh = "(套餐id like'%" + f.data.查询 + "%')" +
				"or (账号 like'%" + f.data.查询 + "%')" +
				"or (姓名 like'%" + f.data.查询 + "%')" +
				"or (卡号 like'%" + f.data.查询 + "%')" +
				"or (支付方式 like'%" + f.data.查询 + "%')" +
				"or (上级 like'%" + f.data.查询 + "%')" +
				"or (上级姓名 like'%" + f.data.查询 + "%')" +
				"or (套餐 like'%" + f.data.查询 + "%')" +
//				"or (面值 like'%" + f.data.查询 + "%')" +
//				"or (赠送 like'%" + f.data.查询 + "%')" +
//				"or (日返积分 like'%" + f.data.查询 + "%')" +
//				"or (总额 like'%" + f.data.查询 + "%')" +
//				"or (数量 like'%" + f.data.查询 + "%')" +
				"or (支付订单号 like'%" + f.data.查询 + "%')" +
				"or (类别 like'%" + f.data.查询 + "%')" +
				"or (状态 like'%" + f.data.查询 + "%')" +
				"or (录入人 like'%" + f.data.查询 + "%')" +
				"or (录入时间 like'%" + f.data.查询 + "%')" +
				"or (内容 like'%" + f.data.查询 + "%')" +
				"or (备注 like'%" + f.data.查询 + "%')" +
				"or (支付时间 like'%" + f.data.查询 + "%')" +
				"or (社区代理分公司名称 like'%" + f.data.查询 + "%')" +
				"or (市代理分公司名称 like'%" + f.data.查询 + "%')" +
				"or (市代理分公司id like'%" + f.data.查询 + "%')" +
				"or (社区代理分公司id like'%" + f.data.查询 + "%')" +
				"or (商户订单号 like'%" + f.data.查询 + "%')"
		}

	}
	p.sql = "select id,套餐id,账号,姓名,卡号,支付方式,上级,上级姓名,套餐,面值,赠送,日返积分,总额,数量,支付订单号,类别,状态,录入人,录入时间,内容,备注,支付时间,社区代理分公司名称,市代理分公司名称,市代理分公司id,社区代理分公司id,商户订单号 from 分_开卡日志表  where" + wh;
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