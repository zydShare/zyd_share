//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.账号 != null && f.data.账号 != '') {
			where += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.名称 != null && f.data.名称 != '') {
			where += " and 名称 = '" + f.data.名称 + "'";
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
	p.sql = "select id,账号,名称,包邮,件数,round(重量,2) as 重量,round(体积,2) as 体积,round(额度,2) as 额度,round(累加,2) as 累加,round(累计 ,2) as 累计,最低条件,状态,录入人,录入时间 from 商_运费模板表  where " + where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "运费模板",
		"模块": "adminfunc",
		"func": "shop_freight_template",
		"页数": "10",
		"表名": "商_运费模板表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}