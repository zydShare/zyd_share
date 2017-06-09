//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	//查询条件还没有
	
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,标题,内容,状态,类别,录入人,录入时间,备注  from 平_说明表  where "+ where;
  	}else{
  		p.sql = "select id,标题,内容,状态,类别,录入人,录入时间,备注  from 平_说明表  where  "+ where;
  	}	
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "平_说明表",
		"模块": "adminfunc",
		"func": "shop_shuomingbiao",
		"页数": "10",
		"表名": "平_说明表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}