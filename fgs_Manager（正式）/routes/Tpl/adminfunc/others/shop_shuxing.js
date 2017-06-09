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
		if(f.data.颜色 != null && f.data.颜色 != ''){
			where += " and  颜色 = '" + f.data.颜色 + "'";
		}
		if(f.data.尺寸 != null && f.data.尺寸 != ''){
			where += " and  尺寸 = '" + f.data.尺寸 + "'";
		}
		if(f.data.规格 != null && f.data.规格 != ''){
			where += " and  规格 = '" + f.data.规格 + "'";
		}		 
		if(f.data.库存 != null && f.data.库存 != ''){
			where += " and  库存 = '" + f.data.库存 + "'";
		}
		if(f.data.商品id != null && f.data.商品id != ''){
			where += " and  商品id = '" + f.data.商品id + "'";
		}		
		if(f.data.状态 != null && f.data.状态 != ''){
			where += " and  状态 = '" + f.data.状态 + "'";
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
         p.sql = "select id,颜色,尺寸,规格,库存,商品id,状态,录入人,录入时间,备注  from 商_属性表  where "+ where;
  	}else{
  		p.sql = "select id,颜色,尺寸,规格,库存,商品id,状态,录入人,录入时间,备注  from 商_属性表  where "+ where;
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
		"名称": "商_属性表",
		"模块": "adminfunc",
		"func": "shop_shuxing",
		"页数": "10",
		"表名": "商_属性表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}