/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop = require('./shop_songhuodz.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop.json();
	p.表名 = '商_发货地址表';
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
	f._json = shop.json();
	if(f.data.id != '')
		sql = "update 商_发货地址表 set 账号='" + f.data.账号 + "', 姓名='" + f.data.姓名 + "', 省='" + f.data.省 + "', 市='" + f.data.市 + "', 区='" + f.data.区 + "', 地址='" + f.data.地址 + "', 手机号='" + f.data.手机号 + "', 发货人='" + f.data.发货人 + "', 状态='" + f.data.状态 + "', 类别='" + f.data.类别 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_发货地址表 (账号, 姓名, 省, 市, 区, 地址, 手机号, 发货人, 状态, 类别, 录入人, 录入时间, 备注) values ('" + f.data.账号+ "','" + f.data.姓名+ "','" + f.data.省+ "','" + f.data.市+ "','" + f.data.区+ "','" + f.data.地址+ "','" + f.data.手机号+ "','" + f.data.发货人+ "','" + f.data.状态+ "', '" + f.data.类别 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
	//sqlite.close(db);
	
	return f;
}
