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
		//			//			wh += " and 账号  = '" + f.data.账号 + "'";
		//			wh = " 账号 LIKE '%" + f.data.账号 + "%'";
		//		}
		//		if(f.data.姓名 != null && f.data.姓名 != '') {
		//			//			wh += " and 姓名  = '" + f.data.姓名 + "'";
		//			wh = " 姓名 LIKE '%" + f.data.姓名 + "%'";
		//		}
		//		if(f.data.是否分红 != null && f.data.是否分红 != '') {
		//			wh += " and 是否分红  = '" + f.data.是否分红 + "'";
		//		}
		//
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
			wh = "(账号 like'%" + f.data.查询 + "%')" +
				"or (姓名 like'%" + f.data.查询 + "%')" +
				//					"or (所占股数 like'%" + f.data.查询 + "%')" +
				//					"or (单股金额 like'%" + f.data.查询 + "%')" +
				"or (分公司名称 like'%" + f.data.查询 + "%')" +
				"or (状态 like'%" + f.data.查询 + "%')" +
				"or (类别 like'%" + f.data.查询 + "%')" +
				"or (录入人 like'%" + f.data.查询 + "%')" +
				"or (录入时间 like'%" + f.data.查询 + "%')" +
				//					"or (个人提取分红 like'%" + f.data.查询 + "%')" +
				"or (分公司id like'%" + f.data.查询 + "%')" +
				"or (备注 like'%" + f.data.查询 + "%')" +
				"or (是否分红 like'%" + f.data.查询 + "%')";
		}
	}
	p.sql = "select id,账号,姓名,所占股数,单股金额,分公司名称,状态,类别,录入人,录入时间,个人提取分红,分公司id,备注,是否分红 from 分_分公司成员表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_分公司成员",
		"模块": "adminfunc",
		"func": "fgs_branchCompany_member",
		"页数": "10",
		"表名": "分_分公司成员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}