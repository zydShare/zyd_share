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
		if(f.data.账号 != null && f.data.账号  != ''){
			where += "and 账号 like '%"+f.data.账号+"%'";
		}
		if(f.data.商品名称 != null && f.data.商品名称 != ''){
			where += "and 商品名称 like '%"+f.data.商品名称+"%'";
		}
		if(f.data.下架原因 != null && f.data.下架原因 != ''){
			where += "and 下架原因 like '%"+f.data.下架原因+"%'";
		}
		if(f.data.下架时间 != null && f.data.下架时间 != ''){
			where += "and 下架时间 like '%"+f.data.下架时间+"%'";
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
	}
	//默认查询所有的数据
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,账号,商品名称,下架原因,下架时间,状态,录入人,录入时间,备注   from 商_商品下架表  where " + where;
  	}else{
  		p.sql = "select id,账号,商品名称,下架原因,下架时间,状态,录入人,录入时间,备注   from 商_商品下架表  where "+where;
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
		"名称": "商品下架表",
		"模块": "adminfunc",
		"func": "shop_shangpxiajb",
		"页数": "10",
		"表名": "商_商品下架表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}