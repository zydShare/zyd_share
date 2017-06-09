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
	p.sql = "select id, 商品名称, round(商品单价, 2) as 商品单价, 账号, 姓名, 商户网站唯一订单号, 支付宝交易号, 买家支付宝账号, 交易状态, 卖家支付宝用户号, 交易创建时间, 通知时间, 交易付款时间, 卖家支付宝账号, 商品描述, 支付详细, 类别, 状态, 录入人, 录入时间  from 平_支付宝账号日志表  where "+ where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "支付宝账号日志",
		"模块": "adminfunc",
		"func": "zhifubaozhanghao_rizhi",
		"页数": "10",
		"表名": "平_支付宝账号日志表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}