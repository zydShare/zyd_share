//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.接口名 != null && f.data.接口名 != '') {
			where += " and 接口名 = '" + f.data.接口名 + "'";
		}
		if(f.data.func号 != null && f.data.func号 != '') {
			where += " and func号 = '" + f.data.func号 + "'";
		}
		if(f.data.接口类别 != null && f.data.接口类别 != '') {
			where += " and 接口类别 = '" + f.data.接口类别 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != '') {
			where += " and 状态 = '" + f.data.状态 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			where += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			where += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
		}
	}
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
           p.sql = "select id from 平_账户类别表  where id = 0 ";
    }else*/
	p.sql = "select id,接口名,func号,接口类别,接口请求地址,状态,说明,录入人,录入时间 from 平_服务号接口表  where " + where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "服务号接口",
		"模块": "adminfunc",
		"func": "service_interface",
		"页数": "10",
		"表名": "平_服务号接口表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}