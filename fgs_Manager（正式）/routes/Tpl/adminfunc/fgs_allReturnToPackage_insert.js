/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_allReturnToPackage.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_全返套餐表';
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
	f._json = account.json();
	var sql_con = '';
	
	var sql = "insert into 分_全返套餐表 (套餐名称,卡号,账号,姓名,手机号,消费账户,赠送积分,面值,日返还积分,上次返还时间,状态,类别,录入人,录入时间,备注,数量,次数,年月) values ('" 
	+f.data.套餐名称 + "','" 
	+f.data.卡号 + "','" 
	+f.data.账号 + "','" 
	+f.data.姓名 + "','" 
	+f.data.手机号 + "','" 
	+f.data.消费账户 + "','" 
	+f.data.赠送积分 + "','" 
	+f.data.面值 + "','" 
	+f.data.日返还积分 + "','" 
	+f.data.上次返还时间 + "','" 
	+f.data.类别 + "','" 
	+f.data.状态 + "','" 
	+f.data.录入人 + "','" 
	+f.data.录入时间 + "','" 
	+f.data.备注 + "','" 
	+f.data.数量 + "','" 
	+f.data.次数 + "','" 
	+f.data.年月 + "')";
	

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}