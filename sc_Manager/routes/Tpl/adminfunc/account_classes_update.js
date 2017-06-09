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
	p.表名 = '全_加盟设置表';
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
		sql = "update 全_加盟设置表 set 名称='" + f.data.名称 + 
		"', 显示名称='" + f.data.显示名称 +
		"', 加盟费='" + f.data.加盟费 +
		"', 提成='" + f.data.提成 +
		"', 提成百分比='" + f.data.提成百分比 + 
		"', 提成最低数='" + f.data.提成最低数 + 
		"', 开始级别='" + f.data.开始级别 +
		"', 结束级别='" + f.data.结束级别 +
		"', 权限='" + f.data.权限 + 
		"', 类别='" + f.data.类别 + 
		"', 状态='" + f.data.状态 +
		"', 排序='" + f.data.排序 +
		"', 录入人='" + f.data.录入人 + 
		"', 录入时间='" + f.data.录入时间 +
		"', 备注='" + f.data.备注 + 
		"', 层1提成='" + f.data.层1提成 + 
		"', 层2提成='" + f.data.层2提成 + 
		"', 层3提成='" + f.data.层3提成 + 
		"', 俱乐部层1提成='" + f.data.俱乐部层1提成 + 
		"', 俱乐部层2提成='" + f.data.俱乐部层2提成 +
		"', 俱乐部层3提成='" + f.data.俱乐部层3提成 + 
		"', 网络部提成='" + f.data.网络部提成 + 
		"', 日返积分='" + f.data.日返积分 + 
		"', 财务部提成='" + f.data.财务部提成 + 
		"', 说明='" + f.data.说明 + 
		"', 分公司层1提成='" + f.data.分公司层1提成 + 
		"', 分公司层2提成='" + f.data.分公司层2提成 + 
		"', 分公司层3提成='" + f.data.分公司层3提成 +
		"', 七大提成='" + f.data.七大提成 + 
		"', 全球提成='" + f.data.全球提成 + 
		"', 审计中心提成='" + f.data.审计中心提成 + 
		"', 监管中心提成='" + f.data.监管中心提成 +
		"', 客服中心提成='" + f.data.客服中心提成 + 
		"' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 全_加盟设置表 (名称,显示名称,加盟费,提成,提成百分比,提成最低数,开始级别,结束级别,权限,类别,状态,排序,录入人,录入时间,备注,层1提成,层2提成,层3提成,俱乐部层1提成,俱乐部层2提成,俱乐部层3提成,网络部提成,赠送积分,日返积分,财务部提成,说明,分公司层1提成,分公司层2提成,分公司层3提成,七大提成,全球提成,审计中心提成,监管中心提成,客服中心提成) values ('" + f.data.名称 +
		"', '" + f.data.显示名称 + 
		"','" + f.data.加盟费 + 
		"','" + f.data.提成 + 
		"','" + f.data.提成百分比 + 
		"','" + f.data.提成最低数 + 
		"','" + f.data.开始级别 +
		"','" + f.data.结束级别 + 
		"','" + f.data.权限 + 
		"','" + f.data.类别 + 
		"','" + f.data.状态 +
		"','" + f.data.排序 + 
		"','" + f.session.user_name + 
		"', '" + f.date + 
		"', '" + f.data.备注+ 
		"','" + f.data.层1提成 +
		"','" + f.data.层2提成 + 
		"','" + f.data.层3提成 + 
		"', '" + f.data.俱乐部层1提成 + 
		"', '" + f.data.俱乐部层2提成 +
		"', '" + f.data.俱乐部层3提成 + 
		"', '" + f.data.网络部提成 + 
		"', '" + f.data.赠送积分 + 
		"', '" + f.data.日返积分 + 
		"', '" + f.data.财务部提成 + 
		"', '" + f.data.说明 + 
		"', '" + f.data.分公司层1提成 + 
		"', '" + f.data.分公司层2提成 + 
		"', '" + f.data.分公司层3提成 + 
		"', '" + f.data.七大提成 + 
		"', '" + f.data.全球提成 + 
		"', '" + f.data.审计中心提成 + 
		"', '" + f.data.监管中心提成 +
		"', '" + f.data.客服中心提成 + "')";
		//console.log(sql);
		console.log(f.data.赠送积分)
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功'){
		f._状态='提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}
