//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	//查询条件还没有
  		p.sql = "select id,功能,支付方式,服务账号id,状态,录入人,录入时间,备注  from 平_服务号支付方式表  where "+ where;
  
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "服务号支付方式",
		"模块": "adminfunc",
		"func": "shop_fwhzhifufanshi",
		"页数": "10",
		"表名": "平_服务号支付方式表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}