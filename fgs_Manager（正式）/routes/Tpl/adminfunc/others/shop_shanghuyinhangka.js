//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	//查询条件还没有
	if(f.data != null) {
		if(f.data.商户名称 != null && f.data.商户名称 != ''){
			where += "and 商户名称 like '%"+f.data.商户名称+"%'";
		}
		if(f.data.商户类型 != null && f.data.商户类型 != ''){
			where += "and 商户类型 like '%"+f.data.商户类型+"%'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,商户id,商户名称,商户类别,手机号码,持卡人名称,银行卡号,银行卡名称,银行编码,支行名称,证件类型,证件号码,状态,类别,平台,录入人,录入时间,备注   from 异_商户银行卡表  where " + where;
  	}else{
  		p.sql = "select id,商户id,商户名称,商户类别,手机号码,持卡人名称,银行卡号,银行卡名称,银行编码,支行名称,证件类型,证件号码,状态,类别,平台,录入人,录入时间,备注   from 异_商户银行卡表  where  "+where;
  	}
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
//	console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "异_商户银行卡",
		"模块": "adminfunc",
		"func": "shop_shanghuyinhangka",
		"页数": "10",
		"表名": "异_商户银行卡表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}