/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_branchCompany_setting.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_分公司设置表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f, pg, mo) {
	f._json = account.json();
	var sql_con = '';
	var sql = '';
	//	if(f.data.id != '') //更改
	//		sql_con = " and id <> " + f.data.id;
	//	sql = "select id from 平_账户类别表 where 类别详情 = '" + f.data.类别详情 + "' and  类别='" + f.data.类别 + "' "+ sql_con;
	//	f.账户类别 = pgdb.query(pg, sql).数据;
	//	if(f.账户类别[0]) {
	//		f._状态 = '该类型已存在';
	//		return f;
	//	}

	//更改

	if(f.data.id != '') {

		sql = "update 分_分公司设置表 set 名称='" + f.data.名称 +
			"', 股数='" + f.data.股数 +
			"', 单股金额='" + f.data.单股金额 +
			"', 提成积分='" + f.data.提成积分 +
			"', 协议='" + f.data.协议 +
			"', 创建数量='" + f.data.创建数量 +
			"', 全球提成='" + f.data.全球提成 +
			"', 七大提成='" + f.data.七大提成 +
			"', 上级提成='" + f.data.上级提成 +
			"', 每股赠送个数='" + f.data.每股赠送个数 +
			"', 状态='" + f.data.状态 +
			"', 类别='" + f.data.类别 +
			"', 录入人='" + f.data.录入人 +
			"', 录入时间='" + f.data.录入时间 +
			"', 说明='" + f.data.说明 +
			"', 备注='" + f.data.备注 +
			"' where id = " + f.data.id;
	} else if(f.data.id == '') {
		if(f.data.全球提成 == "" || f.data.七大提成 == "" || f.data.上级提成 == "") {
			f.data.全球提成 = 0;
			f.data.七大提成 = 0;
			f.data.上级提成 = 0;
		}
		sql = "insert into 分_分公司设置表 (名称,股数,单股金额,提成积分,协议,创建数量,全球提成,七大提成,上级提成,每股赠送个数,类别,状态,录入人,录入时间,说明,备注) values ('" +
			f.data.名称 + "','" +
			f.data.股数 + "','" +
			f.data.单股金额 + "','" +
			f.data.提成积分 + "','" +
			f.data.协议 + "','" +
			f.data.创建数量 + "','" +
			f.data.全球提成 + "','" +
			f.data.七大提成 + "','" +
			f.data.上级提成 + "','" +
			f.data.每股赠送个数 + "','" +
			f.data.类别 + "','" +
			f.data.状态 + "','" +
			f.data.录入人 + "','" +
			f.data.录入时间 + "','" +
			f.data.说明 + "','" +
			f.data.备注 + "')";
	}

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}