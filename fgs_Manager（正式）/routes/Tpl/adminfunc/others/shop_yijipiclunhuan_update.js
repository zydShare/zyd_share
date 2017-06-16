/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_yijipiclunhuan = require('./shop_yijipiclunhuan.js');
//单条显示
//select id,标题,录入人,录入时间  from 平_图片表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_yijipiclunhuan.json();
	p.表名 = '平_一级图片表';
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
	f._json = shop_yijipiclunhuan.json();
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 平_一级图片表 set 一级标题='" +f.data.一级标题 +"',图片id='" + f.data.图片id + "',模块事件='" + f.data.模块事件 + "',排序='" + f.data.排序 + "',服务账号='" + f.data.服务账号 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 平_一级图片表 (一级标题,图片id,模块事件,排序,服务账号,录入人,录入时间) values ('" + f.data.一级标题 + "','" + f.data.图片id + "','" + f.data.模块事件 + "','" + f.data.排序 + "','" + f.data.服务账号 + "','" + f.session.user_name + "','" + f.date + "')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }
	return f;
}
