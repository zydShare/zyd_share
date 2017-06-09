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
		if(f.data.id != null && f.data.id != ''){
			where += " and  id = '" + f.data.id + "'";
		}
		if(f.data.推荐类别 != null && f.data.推荐类别 != ''){
			where += "and 推荐类别 = '"+f.data.推荐类别+"'";
		}
		if(f.data.推荐类别id != null && f.data.推荐类别id != ''){
			where += "and 推荐类别id = '"+f.data.推荐类别id+"'";
		}
		if(f.data.加盟类别 != null && f.data.加盟类别 != ''){
			where += "and 加盟类别 = '"+f.data.加盟类别+"'";
		}
		if(f.data.加盟类别id != null && f.data.加盟类别id != ''){
			where += "and 加盟类别id = '"+f.data.加盟类别id+"'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += "and 类别 = '"+f.data.类别+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += "and 状态 = '"+f.data.状态+"'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
		if(f.data.备注 != null && f.data.备注 != ''){
			where += "and 备注 = '"+f.data.备注+"'";
		}
	}
	//默认查询所有的数据
  	p.sql = "select id,推荐类别,推荐类别id,加盟类别,加盟类别id,层1提成,层2提成,层3提成,俱乐部层1提成,俱乐部层2提成,俱乐部层3提成,财务部提成,网络部提成,分公司层1提成,分公司层2提成,分公司层3提成,七大提成,全球提成,审计中心提成,监管中心提成,财务中心提成,客服中心提成,运管中心提成,类别,状态,录入人,录入时间,备注   from 商_加盟提成表  where "+where;
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
		"名称": "商_加盟商提成",
		"模块": "adminfunc",
		"func": "jiamengshangticheng",
		"页数": "10",
		"表名": "商_加盟提成表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}