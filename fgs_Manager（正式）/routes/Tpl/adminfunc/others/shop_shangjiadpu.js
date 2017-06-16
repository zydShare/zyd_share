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
		if(f.data.商家账号 != null && f.data.商家账号 != ''){
			where += " and 商家账号 = '"+f.data.商家账号+"'";
		}
		if(f.data.店铺验证 != null && f.data.店铺验证 != ''){
			where += " and 店铺验证 = '"+f.data.店铺验证+"'";
		}
		if(f.data.商家姓名 != null && f.data.商家姓名 != ''){
			where += " and 商家姓名 = '"+f.data.商家姓名+"'";
		}
		if(f.data.店铺名称 != null && f.data.店铺名称 != ''){
			where += " and 店铺名称 = '"+f.data.店铺名称+"'";
		}
                if(f.data.法人姓名 != null && f.data.法人姓名 != ''){
			where += " and 法人姓名 = '"+f.data.法人姓名+"'";
		}
		if(f.data.主营类别 != null && f.data.主营类别 != ''){
			where += " and 主营类别 = '"+f.data.主营类别+"'";
		}
		if(f.data.状态 != null && f.data.状态 != ''){
			where += " and 状态 = '"+f.data.状态+"'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += " and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += " and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
	
  	p.sql = "select id,商家账号,商家姓名,店铺名称,店铺图标,店招图片,关注数量,商品销售量,店铺验证,法人姓名,营业执照,主营类别,试用期,创建时间,店铺介绍,状态,录入人,录入时间,备注   from 商_商家店铺表  where "+where;
  	console.log(p.sql)
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
		"名称": "商家店铺",
		"模块": "adminfunc",
		"func": "shop_shangjiadpu",
		"页数": "10",
		"表名": "商_商家店铺表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}
