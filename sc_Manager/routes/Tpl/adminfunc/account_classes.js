//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";

	if(f.data != null) {
		if(f.data.状态 != null && f.data.状态 != '') {
			where += " and 状态 = '" + f.data.状态 + "'";
		}
		if(f.data.名称 != null && f.data.名称 != '') {
			where += " and 名称 = '" + f.data.名称 + "'";
		}
		if(f.data.类别详情 != null && f.data.录入人 != '') {
			where += " and 录入人  = '" + f.data.录入人 + "'";
		}
		if(f.data.录入时间 != null && f.data.录入时间 != ''){
			where += "and 录入时间 >= '"+f.data.录入时间+"'";
		}
		
		
		
	}
p.sql = "select id,名称,显示名称,加盟费,提成,提成百分比,提成最低数,开始级别,结束级别,权限,类别,状态,排序,录入人,录入时间,备注,层1提成,层2提成,层3提成,俱乐部层1提成,俱乐部层2提成,俱乐部层3提成,网络部提成,赠送积分,日返积分,财务部提成,说明,分公司层1提成,分公司层2提成,分公司层3提成,七大提成,全球提成,审计中心提成,监管中心提成,客服中心提成  from 全_加盟设置表   where "+where;
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "加盟设置表",
		"模块": "adminfunc",
		"func": "account_classes",
		"页数": "10",
		"表名": "全_加盟设置表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}