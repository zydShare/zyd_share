/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_branchCompany_member.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_分公司成员表';
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
	

	//更改
	var sql = "insert into 分_分公司成员表 (账号,姓名,所占股数,单股金额,分公司名称,状态,类别,录入人,录入时间,个人提取分红,分公司id,备注,是否分红 ) values ('" +
		f.data.账号 + "','" +
		f.data.姓名 + "','" +
		f.data.所占股数 + "','" +
		f.data.单股金额 + "','" +
		f.data.分公司名称 + "','" +
		f.data.状态 + "','" +
		f.data.类别 + "','" +
		f.data.录入人 + "','" +
		f.data.录入时间 + "','" +
		f.data.个人提取分红 + "','" +
		f.data.分公司id + "','" +
		f.data.备注 + "','" +
		f.data.是否分红 + "')";

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}