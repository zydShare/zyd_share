﻿/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pay = require('./method_of_payment.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = pay.json();
	p.表名 = '平_支付方式表';
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
	f._json = pay.json();
	//更改
	/*if(f.data.id != '')
		sql = "update 平_账户类别表 set 类别='" + f.data.类别 + "', 类别详情='" + f.data.类别详情 + "' where id = " + f.data.id;
	else if(f.data.id == '')*/
		sql = "insert into 平_支付方式表 (支付方式,录入人,录入时间,备注) values ('" + f.data.支付方式 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";

		  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);
	return f;
}