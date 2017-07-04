/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_log_basic.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_基本日志表';
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
	var sql = '';


	if(f.data.id != '') {

		sql = "update 分_基本日志表  set 账号='" + f.data.账号 
		+"', 姓名='" + f.data.姓名 
		+"', 应发积分='" + f.data.应发积分
		+"', 实发积分='" + f.data.实发积分 
		+"', 开卡id='" + f.data.开卡id
		+"', 套餐='" + f.data.套餐 
		+"', 支付方式='" + f.data.支付方式
		+"', 类别='" + f.data.类别 
		+"', 状态='" + f.data.状态 	
		+"', 录入人='" + f.data.录入人
		+"', 录入时间='" + f.data.录入时间		
		+"', 卡号='" + f.data.卡号 
		+"', 卡姓名='" + f.data.卡姓名 
		+"', 数量='" + f.data.数量 
		+"', 账号类别='" + f.data.账号类别 
		+"', 当时类别='" + f.data.当时类别 		
		+"', 备注='" + f.data.备注 
		+"' where id = " + f.data.id;
		
	} else if(f.data.id == '') {

		sql = "insert into 分_基本日志表 (账号,姓名,应发积分,实发积分,开卡id,套餐,支付方式,状态,类别,录入人,录入时间,卡号,卡姓名,数量,账号类别,当时类别,备注) values ('" 
		+f.data.账号 + "','" 
		+f.data.姓名 + "','" 
		+f.data.应发积分 + "','" 
		+f.data.实发积分 + "','" 
		+f.data.开卡id + "','" 
		+f.data.套餐 + "','" 
		+f.data.支付方式 + "','" 
		+f.data.状态 + "','" 
		+f.data.类别 + "','" 
		+f.data.录入人 + "','" 
		+f.data.录入时间 + "','" 
		+f.data.卡号 + "','" 
		+f.data.卡姓名 + "','" 
		+f.data.数量 + "','" 
		+f.data.账号类别 + "','" 
		+f.data.当时类别 + "','" 
		+f.data.备注 + "')";
	}

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}