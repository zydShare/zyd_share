﻿//select id,一级分类名称,类别id,状态,录入人,录入时间,备注  from 商_一级分类表
/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_sanjifenlei = require('./shop_sanjifenlei.js');
//单条显示
//select id,类别名称,排序,图标,状态,录入人,录入时间,备注  from 商_商品类别表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_sanjifenlei.json();
	p.表名 = '商_三级分类表';
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
	//db = sqlite.connect();
	f._json = shop_sanjifenlei.json();
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 商_三级分类表 set 三级分类名称='" + f.data.三级分类名称 + "',图标='" + f.data.图标 + "',类别id='" + f.data.类别id + "',状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_三级分类表 (三级分类名称,图标,类别id,状态,录入人,录入时间,备注) values ('" + f.data.三级分类名称 + "','" + f.data.图标 + "','" + f.data.类别id + "','" + f.data.状态 + "','" + f.session.user_name + "','" + f.date + "','" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	return f;
}
