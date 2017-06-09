/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_branchCompany_account.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_说明表';
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

		sql = "update 分_说明表 set 卡号='" + f.data.卡号 
		+"', 标题='" + f.data.标题 
		+"', 内容='" + f.data.内容 
		+"', 状态='" + f.data.状态 
		+"', 类别='" + f.data.类别 
		+"', 录入人='" + f.data.录入人
		+"', 录入时间='" + f.data.录入时间
		+"', 备注='" + f.data.备注 
		+"' where id = " + f.data.id;
		
	} else if(f.data.id == '') {

		sql = "insert into 分_说明表 (标题,内容,状态,类别,录入人,录入时间,备注) values ('" 
		+f.data.标题 + "','" 
		+f.data.内容 + "','" 
		+f.data.状态 + "','" 		
		+f.data.类别 + "','" 
		+f.data.录入人 + "','" 
		+f.data.录入时间 + "','" 
		+f.data.备注 + "')";
	}

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}