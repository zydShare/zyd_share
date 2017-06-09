/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var smrz = require('./smrz.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = smrz.json();
	p.表名 = '平_实名认证表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}

module.exports.form = function(f, pg, mo) {
	//更改
	//console.log(f.data);
	f._json = smrz.json();
	sql = "select 账号 from 平_实名认证表 where id = " + f.data.id;
	s = pgdb.query(pg, sql);

	sql = "select 类别 from 平_实名认证表 where 类别='已认证' and 账号 =  '" + s.数据[0].账号 + "' ";
	a = pgdb.query(pg, sql);
	if(a.数据.length > 0) {
		f._状态 = '已认证不能再次审核';
		return f;
	} else {
		if(f.data.audit == '审核成功')
			sql = "update 平_实名认证表 set  类别='已认证' where id = " + f.data.id;
		else{
			sql = "update 平_实名认证表 set  类别='认证失败' where id = " + f.data.id;
		}
	}
	pgdb.query(pg, sql);
	//sqlite.close(db);

	return f;
}