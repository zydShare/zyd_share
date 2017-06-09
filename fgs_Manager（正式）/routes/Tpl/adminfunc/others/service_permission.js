//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.服务账号id != null && f.data.服务账号id != '') {
			where += " and 服务账号id = '" + f.data.服务账号id + "'";
		}
		if(f.data.权限id != null && f.data.权限id != '') {
			where += " and 权限id like '%" + f.data.权限id + "%'";
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
	p.sql = "select id,服务账号id,权限id,录入人,录入时间 from 平_服务号权限表  where " + where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "服务号权限",
		"模块": "adminfunc",
		"func": "service_permission",
		"页数": "10",
		"表名": "平_服务号权限表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}