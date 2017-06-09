/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop = require('./shop_shangjiadpu.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop.json();
	p.表名 = '商_商家店铺表';
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
	f._json = shop.json();
	sql = "insert into 商_商家店铺表 (商家账号, 商家姓名, 店铺名称, 店铺图标, 店招图片, 关注数量, 商品销售量, 店铺验证, 法人姓名, 营业执照, 其它资质, 主营类别, 试用期, 创建时间, 店铺介绍, 状态, 录入人, 录入时间) values ('" + f.data.商家账号 + "','" + f.data.商家姓名 + "','" + f.data.店铺名称 + "', '" + f.data.店铺图标 + "', '" + f.data.店招图片 + "', '" + f.data.关注数量 + "', '" + f.data.商品销售量 + "', '1', '" + f.data.法人姓名 + "', '[]',  '[]', '" + f.data.主营类别 + "', '', '', '" + f.data.店铺介绍 + "', '" + f.data.状态 + "',  '" + f.session.user_name + "', '" + f.date + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);

	return f;
}