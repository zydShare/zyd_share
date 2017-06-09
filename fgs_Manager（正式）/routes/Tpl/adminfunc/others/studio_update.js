/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var user = require('./studio.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = user.json();
	p.表名 = '播_直播间表';
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
	/*db = sqlite.connect();
	var sql_con = '';
	var sql = '';
	if(f.data.id != '') //更改
		sql_con = " and id <> " + f.data.id;
	sql = "select id from 管_管理员表 where 登录名 = '" + f.data.登录名 + "'" + sql_con;
	f.用户信息 = pgdb.query(db, sql).数据;
	if(f.用户信息[0]) {
		f._状态 = '登录名已存在';
		return f;
	}
*/
	//更改
	if(f.data.名称 == "") {
		f._状态 = '名称不能为空';
		return f;
	} else if(f.data.图片 == "") {
		f._状态 = '图片不能为空';
		return f;
	} else if(f.data.开播时间 == "") {
		f._状态 = '开播时间不能为空';
		return f;
	} else if(f.data.关播时间 == "") {
		f._状态 = '关播时间不能为空';
		return f;
	} else if(f.data.头像 == "") {
		f._状态 = '头像不能为空';
		return f;
	} else if(f.data.开播时间 > f.data.关播时间) {
		f._状态 = '开播时间不能大于关播时间！';
		return f;
	} else if(f.data.名称.length < 2 || f.data.名称.length > 10) {
		f._状态 = '名称不能少于2位或大于10位';
		return f;
	} else if(f.data.简介.length > 200) {
		f._状态 = '简介不能大于200位';
		return f;
	} 
	if(f.data.id != '')
		sql = "update 播_直播间表 set 名称='" + f.data.名称 + "', 头像='" + f.data.头像 + "', 简介='" + f.data.简介 + "', 图片='" 
		+ f.data.图片 + "', 开播时间='" + f.data.开播时间 + "', 关播时间='" + f.data.关播时间 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 播_直播间表 (名称,简介,图片,开播时间,关播时间,状态,类别,录入人,录入时间,备注,直播状态,头像) values ('" +
		f.data.名称 + "', '" + f.data.简介 + "', '" + f.data.图片 + "', '" + f.data.开播时间 + "', '" + f.data.关播时间 
		+"', '" + f.data.状态 + "', '" + f.data.类别 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "', '" 
		+ f.data.直播状态 + "', '" + f.data.头像 + "')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }
	//sqlite.close(db);
	return f;
}
