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
		if(f.data.账号 != null && f.data.账号 != ''){
			where += " and  账号 = '" + f.data.账号 + "'";
		}
		if(f.data.姓名 != null && f.data.姓名 != ''){
			where += " and  姓名 = '" + f.data.姓名 + "'";
		}
		if(f.data.商品名称 != null && f.data.商品名称 != ''){
			where += " and  商品名称 = '" + f.data.商品名称 + "'";
		}
		if(f.data.一级分类id != null && f.data.一级分类id != ''){
			where += " and  一级分类id = '" + f.data.一级分类id + "'";
		}
		if(f.data.二级分类id != null && f.data.二级分类id != ''){
			where += " and  二级分类id = '" + f.data.二级分类id + "'";
		}
		if(f.data.三级分类id != null && f.data.三级分类id != ''){
			where += " and  三级分类id = '" + f.data.三级分类id + "'";
		}
		if(f.data.店铺id != null && f.data.店铺id != ''){
			where += " and  店铺id = '" + f.data.店铺id + "'";
		}
		if(f.data.店铺名 != null && f.data.店铺名 != ''){
			where += " and  店铺名 = '" + f.data.店铺名 + "'";
		}
		if(f.data.类别 != null && f.data.类别 != ''){
			where += " and  类别 = '" + f.data.类别 + "'";
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
	//默认查询所有的数据
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,账号,姓名,商品名称,缩略图,内容,一级分类,一级分类id,二级分类,二级分类id,三级分类id,三级分类,上架状态,首页,精品,特价,特卖,快递费,新品,发货地址id,商品收藏数量,商品类型,店铺id,店铺名,商品详情id,销售量,排序,类别,状态,审核人,审核时间,录入人,录入时间,备注  from 商_商品表  where " + where;
  	}else{*/
  		p.sql = "select id,账号,姓名,商品名称,缩略图,内容,一级分类,一级分类id,二级分类,二级分类id,三级分类id,三级分类,上架状态,首页,精品,特价,特卖,round(快递费, 2) as 快递费,新品,发货地址id,round(商品收藏数量, 2) as 商品收藏数量,商品类型,店铺id,店铺名,商品详情id,round(销售量, 2) as 销售量,排序,类别,状态,审核人,审核时间,录入人,录入时间,备注  from 商_商品表  where " + where;	//做一个判断引用哪个数据库，放到f里面
	//}
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	//console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "商_商品表",
		"模块": "adminfunc",
		"func": "shop_spbiao",
		"页数": "10",
		"表名": "商_商品表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}