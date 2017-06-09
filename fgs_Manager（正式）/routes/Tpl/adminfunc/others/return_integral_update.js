/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var inte = require('./return_integral.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = inte.json();
	p.表名 = '商_返还积分表';
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
	f._json = inte.json();
	if(f.data.id != '')
		sql = "update 商_返还积分表 set 账号='" + f.data.账号 + "',姓名='" + f.data.姓名 + "',名称='" + f.data.名称 + "',推荐人='" + f.data.推荐人 + "',身份='" + f.data.身份 + "',类别='" + f.data.类别 + "',日返积分='" + f.data.日返积分 + "',状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_返还积分表 (账号,姓名,名称,推荐人,身份,类别,日返积分,状态,录入人,录入时间,备注) values ('" + f.data.账号 + "', '" + f.data.姓名+ "','" + f.data.名称 + "','" + f.data.推荐人 + "','" + f.data.身份 + "','" + f.data.类别 + "','" + f.data.日返积分 + "','" + f.data.状态 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);
	
	return f;
}
