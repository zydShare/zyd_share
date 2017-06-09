/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_shouhuafeiliulian= require('./shop_shouhuafeiliulian.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_shouhuafeiliulian.json();
	p.表名 = '平_售话费流量表';
	share.update(p, f, pg);
	//console.log(f);
	return f;
}


/*
 *添加新的售话费流量表
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = shop_shouhuafeiliulian.json();
	if(f.data.类型 == "" || f.data.类型 == "null" || f.data.类型 == undefined){
		f._isRander = "请输入类型!";
		return f;
	}
	if(f.data.面额 == "" || f.data.面额 == "null" || f.data.面额 == undefined){
		f._isRander = "请输入面额!";
		return f;
	}
	if(f.data.售价 == "" || f.data.售价 == "null" || f.data.售价 == undefined){
		f._isRander = "请输入售价!";
		return f;
	}
	if(f.data.状态 == "" || f.data.状态 == "null" || f.data.状态 == undefined){
		f._isRander = "请输入状态!";
		return f;
	}
	
	
	var sql = "insert into 平_售话费流量表(类型,面额,售价,状态,录入人,录入时间,备注) values('"+f.data.类型+"','"+f.data.面额+"','"+f.data.售价+"','"+f.data.状态+"','"+f.session.user_name+"','"+f.date+"','"+f.data.备注+"')"
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
	//console.log(sql)
	return f;
}