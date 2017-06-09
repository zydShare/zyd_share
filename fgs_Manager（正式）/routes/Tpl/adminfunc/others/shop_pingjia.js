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
			where += "and 账号 = '"+f.data.账号+"'";
		}
		if(f.data.商品id != null && f.data.商品id != ''){
			where += "and 商品id = '"+f.data.商品id+"'";
		}
		if(f.data.昵称 != null && f.data.昵称 != ''){
			where += "and 昵称 = '"+f.data.昵称+"'";
		}
		if(f.data.头像 != null && f.data.头像 != ''){
			where += "and 头像 = '"+f.data.头像+"'";
		}
		if(f.data.评论 != null && f.data.评论 != ''){
			where += "and 评论 = '"+f.data.评论+"'";
		}
		if(f.data.图片 != null && f.data.图片 != ''){
			where += "and 图片 = '"+f.data.图片+"'";
		}
		if(f.data.订单id != null && f.data.订单id != ''){
			where += "and 订单id = '"+f.data.订单id+"'";
		}
		if(f.data.商家账号 != null && f.data.商家账号 != ''){
			where += "and 商家账号 = '"+f.data.商家账号+"'";
		}
		if(f.data.销售id != null && f.data.销售id != ''){
			where += "and 销售id = '"+f.data.销售id+"'";
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
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,账号,商品id,昵称,头像,评论,图片,订单id,商家账号,销售id,状态,录入人,录入时间,备注   from 商_商品评价表  where " + where;
  	}else{*/
  		p.sql = "select id,账号,商品id,昵称,头像,评论,图片,订单id,商家账号,销售id,状态,录入人,录入时间,备注   from 商_商品评价表  where "+where;
  	//}
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
		"名称": "商品评价表",
		"模块": "adminfunc",
		"func": "shop_pingjia",
		"页数": "10",
		"表名": "商_商品评价表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}