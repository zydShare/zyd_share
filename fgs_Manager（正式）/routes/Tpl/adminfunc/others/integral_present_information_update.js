/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var present = require('./integral_present_information.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = present.json();
	p.表名 = '商_积分赠送信息表';
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
	f._json = present.json();
	if(f.data.id != '')
		sql = "update 商_积分赠送信息表 set 账号='" + f.data.账号 + "', 姓名='" + f.data.姓名 + "', 数量='" + f.data.数量 + "', 手机号='" + f.data.手机号 + "', 返还类别='" + f.data.返还类别 + "', 类别='" + f.data.类别 + "', 消费账户='" + f.data.消费账户 + "', 月限额='" + f.data.月限额 + "', 当月消费额='" + f.data.当月消费额 + "', 未返总额='" + f.data.未返总额 + "', 状态='" + f.data.状态 + "', 上次返还时间='" + f.data.上次返还时间 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_积分赠送信息表 (账号, 姓名, 数量, 手机号, 返还类别, 类别, 消费账户, 月限额, 当月消费额, 未返总额, 状态, 上次返还时间, 录入人, 录入时间, 备注) values ('" + f.data.账号+ "','" + f.data.姓名+ "','" + f.data.数量+ "','" + f.data.手机号+ "','" + f.data.返还类别+ "','" + f.data.类别+ "','" + f.data.消费账户+ "','" + f.data.月限额+ "','" + f.data.当月消费额+ "','" + f.data.未返总额+ "','" + f.data.状态+ "', '" + f.data.上次返还时间 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	//sqlite.close(db);
	
	return f;
}
