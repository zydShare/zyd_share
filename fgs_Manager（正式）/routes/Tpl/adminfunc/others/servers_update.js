/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var servers = require('./servers.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = servers.json();
	p.表名 = '平_服务号表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
module.exports.form = function(f, pg, mo) {
var pgdb = require('../../../func/pgdb.js');
	//更改
	f._json = servers.json();
	if(f.data.id != '')
		sql = "update 平_服务号表 set 服务账号id='" + f.data.服务账号id + "', 商户号='" + f.data.商户号 + "', 商户名='" + f.data.商户名+ "', 邮箱='" + f.data.邮箱+ "', 运营者='" + f.data.运营者 + "', 手机号='" + f.data.手机号 + "', 有效期='" + f.data.有效期 + "', 密钥='" + f.data.密钥 + "', 状态='" + f.data.状态 + "', 期限='" + f.data.期限 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 平_服务号表 (服务账号id,商户号,商户名,邮箱,运营者,手机号,有效期,密钥,期限,状态,录入人,录入时间,备注) values ('" + f.data.服务账号id+ "','" + f.data.商户号+ "','" + f.data.商户名+ "','" + f.data.邮箱+ "','" + f.data.运营者+ "','" + f.data.手机号+ "','" + f.data.有效期+ "','" + f.data.密钥+ "','" + f.data.期限+ "', '" + f.data.状态 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);
	
	return f;
}
