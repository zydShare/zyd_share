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
			where += "and id = "+f.data.id;
		}
		if(f.data.供货价 != null && f.data.供货价 != ''){
			where += "and 供货价 = "+f.data.供货价;
		}
		if(f.data.市场价 != null && f.data.市场价 != ''){
			where += "and 市场价 = "+f.data.市场价;
		}
		if(f.data.建议零售价 != null && f.data.建议零售价 != ''){
			where += "and 建议零售价 = "+f.data.建议零售价;
		}
		if(f.data.折扣价 != null && f.data.折扣价 != ''){
			where += "and 折扣价 = "+f.data.折扣价;
		}
		if(f.data.属性id != null && f.data.属性id != ''){
			where += "and 属性id = "+f.data.属性id;
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
		if(f.data.商品id != null && f.data.商品id != ''){
			where += "and 商品id = "+f.data.商品id;
		}
	}
	//默认查询所有的数据
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,供货价,市场价,建议零售价,折扣价,属性id,状态,录入人,录入时间,备注,商品id   from 商_商品价格表  where " + where;
  	}else{
  		p.sql = "select id,供货价,市场价,建议零售价,折扣价,属性id,状态,录入人,录入时间,备注,商品id    from 商_商品价格表  where  "+ where;
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
		"名称": "商品价格表",
		"模块": "adminfunc",
		"func": "shop_shangpjiagb",
		"页数": "10",
		"表名": "商_商品价格表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}