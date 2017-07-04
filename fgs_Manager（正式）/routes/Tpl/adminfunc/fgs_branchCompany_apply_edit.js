/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_branchCompany_apply.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_分公司申请表';
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


	if(f.data.id != '') {

		sql = "update 分_分公司申请表 set 账号='" + f.data.账号 
		+"', 姓名='" + f.data.姓名 
		+"', 名称='" + f.data.名称 
		+"', 编号='" + f.data.编号
		+"', 省='" + f.data.省
		+"', 市='" + f.data.市
		+"', 区='" + f.data.区		
		+"', 分公司设置id='" + f.data.分公司设置id 
		+"', 分公司设置名称='" + f.data.分公司设置名称 
		+"', 层1分公司名称='" + f.data.层1分公司名称
		+"', 层1分公司id='" + f.data.层1分公司id
		+"', 层2分公司名称='" + f.data.层2分公司名称
		+"', 层2分公司id='" + f.data.层2分公司id
		+"', 层3分公司名称='" + f.data.层3分公司名称
		+"', 层3分公司id='" + f.data.层3分公司id		
		+"', 金额='" + f.data.金额 
		+"', 股数='" + f.data.股数
		+"', 支付方式='" + f.data.支付方式
		+"', 支付时间='" + f.data.支付时间 
		+"', 支付订单号='" + f.data.支付订单号 
		+"', 商户订单号='" + f.data.商户订单号 
		+"', 每股赠送个数='" + f.data.每股赠送个数 		
		+"', 状态='" + f.data.状态 
		+"', 类别='" + f.data.类别 
		+"', 录入人='" + f.data.录入人
		+"', 录入时间='" + f.data.录入时间
		+"', 备注='" + f.data.备注 				
		+"', 密码='" + f.data.密码 		
		+"', 分公司密码='" + f.data.分公司密码 		
		+"', 上级='" + f.data.上级 		
		+"', 上级姓名='" + f.data.上级姓名 
		
		+"' where id = " + f.data.id;
		
	} else if(f.data.id == '') {

		sql = "insert into 分_分公司申请表 (账号,姓名,名称,编号,省,市,区,分公司设置id,分公司设置名称,层1分公司名称,层1分公司id,层2分公司名称,层2分公司id,层3分公司名称,层3分公司id,金额,股数,支付方式,支付时间,支付订单号,商户订单号,每股赠送个数,状态,类别,录入人,录入时间,备注,密码,分公司密码,上级,上级姓名) values ('" 
		
		+f.data.账号 + "','"
		+f.data.姓名 + "','" 
		+f.data.名称 + "','" 
		+f.data.编号 + "','" 
		+f.data.省 + "','" 
		+f.data.市 + "','" 
		+f.data.区 + "','" 		
		+f.data.分公司设置id + "','" 
		+f.data.分公司设置名称 + "','" 
		+f.data.层1分公司名称 + "','" 
		+f.data.层1分公司id + "','" 
		+f.data.层2分公司名称 + "','" 
		+f.data.层2分公司id + "','" 
		+f.data.层3分公司名称 + "','" 
		+f.data.层3分公司id + "','" 
		+f.data.金额 + "','" 
		+f.data.股数 + "','" 
		+f.data.支付方式 + "','" 
		+f.data.支付时间 + "','"
		+f.data.支付订单号 + "','"
		+f.data.商户订单号 + "','"
		+f.data.每股赠送个数 + "','"			 
		+f.data.状态 + "','" 
		+f.data.类别 + "','"
		+f.data.录入人 + "','" 
		+f.data.录入时间 + "','" 
		+f.data.备注 + "','"
		+f.data.密码 + "','"
		+f.data.分公司密码 + "','"
		+f.data.上级 + "','"
		+f.data.上级姓名 + "')";
	}

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	return f;
}