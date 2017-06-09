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
			where += " and 状态 like '%" + f.data.状态 + "%'";
		}
		if(f.data.红包类型!= null && f.data.红包类型!= '') {
			where += " and 红包类型 = '" + f.data.红包类型 + "'";
		}
		if(f.data.群号 != null && f.data.群号!= '') {
			where += " and 群号 = '" + f.data.群号 + "'";
		}
		if(f.data.红包id != null && f.data.红包id != ''){
			where += " and 红包id = '"+f.data.红包id+ "'";
		}
		if(f.data.发送者账号 != null && f.data.发送者账号 != ''){
			where += "and 发送者账号 = '"+f.data.发送者账号+"'";
		}
		if(f.data.接收账号 != null && f.data.接收账号 != ''){
			where += "and 接收账号 = '"+f.data.接收账号+"'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
		
		
	}
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
           p.sql = "select id from 三_红包表  where id = 0 ";
    }else
	p.sql = "select id,红包id,群号,发送者账号,发送者名称,接收账号,接收名称,红包金额,最小红包金额,最大红包金额,红包个数,红包祝福语,红包类型,状态,类别,录入人,录入时间  from 三_红包表  where "+where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "红包",
		"模块": "admincon",
		"func": "hongbao",
		"页数": "10",
		"表名": "三_红包表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}