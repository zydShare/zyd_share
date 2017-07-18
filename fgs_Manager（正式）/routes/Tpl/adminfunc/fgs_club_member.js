//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {

		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			wh += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			wh += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}

		if(f.data.查询 != null && f.data.查询 != '') {
			wh = "(账号 like'%" + f.data.查询 + "%')" +
				"or (姓名 like'%" + f.data.查询 + "%')" +
//				"or (俱乐部id like'%" + f.data.查询 + "%')" +
				"or (俱乐部编号 like'%" + f.data.查询 + "%')" +
				"or (俱乐部名称 like'%" + f.data.查询 + "%')" +
//				"or (红利百分比 like'%" + f.data.查询 + "%')" +
//				"or (总百分比 like'%" + f.data.查询 + "%')" +
//				"or (购买积分 like'%" + f.data.查询 + "%')" +
				"or (状态 like'%" + f.data.查询 + "%')" +
				"or (类别 like'%" + f.data.查询 + "%')" +
				"or (录入人 like'%" + f.data.查询 + "%')" +
				"or (录入时间 like'%" + f.data.查询 + "%')" +
				"or (备注 like'%" + f.data.查询 + "%')"
		}

	}
	p.sql = "select id,账号,姓名,俱乐部id,俱乐部编号,俱乐部名称,红利百分比,总百分比,购买积分,状态,类别,录入人,录入时间,备注 from 分_俱乐部成员表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分公司俱乐部成员",
		"模块": "adminfunc",
		"func": "fgs_club_member",
		"页数": "10",
		"表名": "分_俱乐部成员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}