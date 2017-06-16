//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	if(f.data != null) {
		if(f.data.账号 != null && f.data.账号!= '') {
			where += " and 账号 = '" + f.data.账号 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
           p.sql = "select id from 平_账户类别表  where id = 0 ";
    }else*/
	p.sql = "select id, 账号, 姓名, 卡号, 卡姓名, 数量, round(应发积分, 2) as 应发积分, round(实发积分, 2) as 实发积分, 开卡id, 套餐, 支付方式, 状态, 类别, 账号类别, 当时类别, 录入人, 录入时间 from 平_奖金日志表  where "+ where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "奖金日志",
		"模块": "adminfunc",
		"func": "jiangjin_rizhi",
		"页数": "10",
		"表名": "平_奖金日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}