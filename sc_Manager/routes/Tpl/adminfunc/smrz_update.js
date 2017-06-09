/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./account_classes.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '全_开卡日志表';
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
	var sql = '';
//	if(f.data.id != '') //更改
//		sql_con = " and id <> " + f.data.id;
//	sql = "select id from 平_账户类别表 where 类别详情 = '" + f.data.类别详情 + "' and  类别='" + f.data.类别 + "' "+ sql_con;
//	f.账户类别 = pgdb.query(pg, sql).数据;
//	if(f.账户类别[0]) {
//		f._状态 = '该类型已存在';
//		return f;
//	}

	//更改
	if(f.data.id != '')
		sql = "update 全_开卡日志表 set 套餐id='" + f.data.套餐id + 
		"', 账号='" + f.data.账号 +
		"', 姓名='" + f.data.姓名 +
		"', 卡号='" + f.data.卡号 +
		"', 支付方式='" + f.data.支付方式 + 
		"', 上级='" + f.data.上级 + 
		"', 上级姓名='" + f.data.上级姓名 +
		"', 套餐='" + f.data.套餐 +
		"', 面值='" + f.data.面值 + 
		"', 赠送='" + f.data.赠送 + 
		"', 日返积分='" + f.data.日返积分 +
		"', 总额='" + f.data.总额 +
		"', 数量='" + f.data.数量 +
		"', 支付订单号='" + f.data.支付订单号 +
		"', 俱乐部id='" + f.data.俱乐部id +
		"', 俱乐部id='" + f.data.俱乐部名称 +
		"', 俱乐部id='" + f.data.类别 +
		"', 俱乐部id='" + f.data.状态 +
		"', 录入人='" + f.data.录入人 + 
		"', 录入时间='" + f.data.录入时间 +
		"', 内容='" + f.data.内容 + 
		"', 备注='" + f.data.备注 + 
		"', 支付时间='" + f.data.支付时间 + 
		"', 俱乐部申请id='" + f.data.俱乐部申请id + 
		"', 社区代理分公司名称='" + f.data.社区代理分公司名称 + 
		"', 市代理分公司名称='" + f.data.市代理分公司名称 +
		"', 市代理分公司id='" + f.data.市代理分公司id + 
		"', 社区代理分公司id='" + f.data.社区代理分公司id + 
		"', 商户订单号='" + f.data.商户订单号 + 
		"' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 全_开卡日志表 (套餐id,账号,姓名,卡号,支付方式,上级,上级姓名,套餐,面值,赠送,日返积分,总额,数量,支付订单号,俱乐部id,俱乐部名称,类别,状态,录入人,录入时间,内容,备注,支付时间,俱乐部申请id,社区代理分公司名称,市代理分公司名称,市代理分公司id,社区代理分公司id,商户订单号) values ('" + f.data.套餐id +
		"', '" + f.data.账号 +
		"', '" + f.data.姓名 +
		"', '" + f.data.卡号 +
		"', '" + f.data.支付方式 + 
		"', '" + f.data.上级 + 
		"', '" + f.data.上级姓名 +
		"', '" + f.data.套餐 +
		"', '" + f.data.面值 + 
		"', '" + f.data.赠送 + 
		"', '" + f.data.日返积分 +
		"', '" + f.data.总额 +
		"', '" + f.data.数量 +
		"', '" + f.data.支付订单号 +
		"', '" + f.data.俱乐部id +
		"', '" + f.data.俱乐部名称 +
		"', '" + f.data.类别 +
		"', '" + f.data.状态 +
		"', '" + f.data.录入人 + 
		"', '" + f.session.user_name +
		"', '" + f.date+ 
		"', '" + f.data.备注 + 
		"', '" + f.data.支付时间 + 
		"', '" + f.data.俱乐部申请id + 
		"', '" + f.data.社区代理分公司名称 + 
		"', '" + f.data.市代理分公司名称 +
		"', '" + f.data.市代理分公司id + 
		"', '" + f.data.社区代理分公司id + 
		"', '" + f.data.商户订单号 +"')";
		//console.log(sql);
		
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功'){
		f._状态='提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}
