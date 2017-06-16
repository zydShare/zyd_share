/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var smrz = require('./smrz.js');
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
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	//更改
	f._json = smrz.json();
	sql = "insert into 平_实名认证表 (账号, 手机号, 真实名, 身份证号, 手持身份证图, 身份证正面图, 身份证背面图, 状态, 类别, 平台,录入人, 录入时间) values ('" + f.data.账号 + "','" + f.data.手机号 + "','" + f.data.真实名 + "', '" + f.data.身份证号 + "', '" + f.data.手持身份证图 + "', '" + f.data.身份证正面图 + "', '" + f.data.身份证背面图 + "',  '" + f.data.状态 + "',  '" + f.data.类别 + "', '" + f.data.平台 + "',   '" + f.session.user_name + "', '" + f.date + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);

	return f;
}