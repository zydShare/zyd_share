/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_spleibie = require('./shop_spleibie.js');
//单条显示
//select id,类别名称,排序,图标,状态,录入人,录入时间,备注  from 商_商品类别表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_spleibie.json();
	p.表名 = '商_商品类别表';
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
	f._json = shop_spleibie.json();
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 商_商品类别表 set 类别名称='" + f.data.类别名称 + "', 排序='" + f.data.排序 + "',图标='" + f.data.图标 + "', 状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_商品类别表 (类别名称,排序,图标,状态,录入人,录入时间,备注) values ('" + f.data.类别名称 + "','" + f.data.排序 + "', '" + f.data.图标 + "', '" + f.data.状态 + "','" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
//insert into 商_商品类别表 (类别名称,排序,图标,状态,录入人,录入时间,备注) values('1','2','3','4','5','6','7')
	
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }
	//sqlite.close(db);
	return f;
}
