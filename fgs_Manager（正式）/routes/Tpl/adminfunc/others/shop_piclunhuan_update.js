/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_piclunhuan = require('./shop_piclunhuan.js');
//单条显示
//select id,标题,录入人,录入时间  from 平_图片表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_piclunhuan.json();
	p.表名 = '平_图片表';
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
	f._json = shop_piclunhuan.json();
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 平_图片表 set 标题='" + f.data.标题 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 平_图片表 (标题,录入人,录入时间) values ('" + f.data.标题 + "','" + f.session.user_name + "','" + f.date + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	return f;
}
