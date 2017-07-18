/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_account.js');
//单条显示
module.exports.run = function(f, pg, mo) {
		var p = {};
		f = control.index(f);
		f._json = account.json();
		p.表名 = '分_奖金日志表';
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

	if (f.data.id != '') {

		sql = "update 分_奖金日志表 set 账号='" + f.data.账号 +
			"', 类别='" + f.data.类别 +
			"', 姓名='" + f.data.姓名 +
			"', 当时类别='" + f.data.当时类别 +
			"', 卡号='" + f.data.卡号 +
			"', 卡姓名='" + f.data.卡姓名 +
			"', 应发积分='" + f.data.应发积分 +
			"', 实发积分='" + f.data.实发积分 +
			"', 开卡id='" + f.data.开卡id +
			"', 数量='" + f.data.数量 +
			"', 套餐='" + f.data.套餐 +
			"', 支付方式='" + f.data.支付方式 +
			"', 状态='" + f.data.状态 +
			"', 录入人='" + f.data.录入人 +
			"', 录入时间='" + f.data.录入时间 +
			"' where id = " + f.data.id;
	} else if (f.data.id == '') {
		sql = "insert into 分_奖金日志表 (账号,类别,姓名,当时类别,卡号,卡姓名,应发积分,实发积分,开卡id,数量,套餐,支付方式,状态,录入人,录入时间) values ('" +
			f.data.账号 + "','" +
			f.data.类别 + "','" +
			f.data.姓名 + "','" +
			f.data.当时类别 + "','" +
			f.data.卡号 + "','" +
			f.data.卡姓名 + "','" +
			f.data.应发积分 + "','" +
			f.data.实发积分 + "','" +
			f.data.开卡id + "','" +
			f.data.数量 + "','" +
			f.data.套餐 + "','" +
			f.data.支付方式 + "','" +
			f.data.状态 + "','" +
			f.data.录入人 + "','" +
			f.data.录入时间+ "')";
	}

	s = pgdb.query(pg, sql);
	if (s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}