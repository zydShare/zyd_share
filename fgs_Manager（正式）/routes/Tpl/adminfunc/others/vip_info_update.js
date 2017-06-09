/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var user = require('./vip_info.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = user.json();
	var sql = "select 账号 from 平_会员表 where id = '"+f.arg.id+"'";
	var result = pgdb.query(pg,sql);
	var 账号 = result.数据[0].账号;
	p.表名 = '平_会员资料表';
	var sql2 = "select id from 平_会员资料表 where 账号 = '"+账号+"'";
	var s = pgdb.query(pg,sql2);
	f.arg.id = s.数据[0].id;
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 修改类别
 */
module.exports.form = function(f, pg, mo) {
	f._json = user.json();
	if(f.data.id == "" || f.data.id == null){
		f._isRander = "请选择要修改类别的账户";
		return f;
	}
	var sql = "update 平_会员资料表  set 类别='"+f.data.类别+"' where 账号 = '"+f.data.账号+"'";
	pgdb.query(pg, sql);

	var sql = "update 平_会员表 set 类别 = '"+f.data.类别+"' where 账号 = '"+f.data.账号+"'";
	pgdb.query(pg, sql);
	return f;
}
