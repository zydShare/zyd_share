/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_ejipiclunhuan = require('./shop_ejipiclunhuan.js');
//单条显示
//select id,标题,录入人,录入时间  from 平_图片表
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_ejipiclunhuan.json();
	p.表名 = '平_二级图片表';
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
	f._json = shop_ejipiclunhuan.json();
	
	var sql = '';
	//更改
	if(f.data.id != '')
		sql = "update 平_二级图片表 set 二级标题='" + f.data.二级标题 + "',二级副标题='" + f.data.二级副标题 + "',图片id='" + f.data.图片id + "',图标='" + f.data.图标 + "',图片='" + f.data.图片 + "',图片链接='" + f.data.图片链接 + "',服务账号id='" + f.data.服务账号id + "',排序='" + f.data.排序 + "',状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 平_二级图片表 (二级标题,二级副标题,图片id,图标,图片,图片链接,服务账号id,排序,状态,录入人,录入时间) values ('" + f.data.二级标题 + "','" + f.data.二级副标题 + "','" + f.data.图片id + "','" + f.data.图标 + "','" + f.data.图片 + "','" + f.data.图片链接 + "','" + f.data.服务账号id + "','" + f.data.排序 + "','" + f.data.状态 + "','" + f.session.user_name + "','" + f.date + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	return f;
}
