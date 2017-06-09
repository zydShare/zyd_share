//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	//查询条件还没有
	/*if(f.data != null) {
		if(f.data.服务账号id != null && f.data.服务账号id != ''){
			where += "and 服务账号id like '%"+f.data.服务账号id+"%'";
		}
		if(f.data.商户号 != null && f.data.商户号 != ''){
			where += "and 商户号 like '%"+f.data.商户号+"%'";
		}
		if(f.data.商户名 != null && f.data.商户名 != ''){
			where += "and 商户名 like '%"+f.data.商户名+"%'";
		}
		if(f.data.邮箱 != null && f.data.邮箱 != ''){
			where += "and 邮箱 like '%"+f.data.邮箱+"%'";
		}
		if(f.data.运营者 != null && f.data.运营者 != ''){
			where += "and 运营者 like '%"+f.data.运营者+"%'";
		}
		if(f.data.手机号 != null && f.data.手机号 != ''){
			where += "and 手机号 like '%"+f.data.手机号+"%'";
		}
		if(f.data.有效期 != null && f.data.有效期 != ''){
			where += "and 有效期 like '%"+f.data.有效期+"%'";
		}
		if(f.data.期限 != null && f.data.期限 != ''){
			where += "and 期限 like '%"+f.data.期限+"%'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 like '%"+f.data.状态+"%'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}*/
	//默认查询所有的数据
/*	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,商户号,批次号,交易时间,总笔数,总金额,类别,状态,录入人,录入时间   from 平_银行代付结算表    where " + where;
  	}else{*/
  		p.sql = "select id,商户号,批次号,交易时间,总笔数,round(总金额, 2) as 总金额,类别,状态,录入人,录入时间  from 平_银行代付结算表  where "+where;
  	//}
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "银行代付列表",
		"模块": "adminconfunc",
		"func": "bank_paid",
		"页数": "10",
		"表名": "平_银行代付结算",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}