/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var sp = require('./shop_spbiao.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = sp.json();
	p.表名 = '商_商品表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}

module.exports.form = function(f, pg, mo) {
	//更改
	f._json = sp.json();
	
	if(f.data.状态 == '申请中') {
		sql = "update 商_商品表 set 状态 = '审核作废', 审核时间='" + f.date + "',审核人 = '" + f.session.user_name  + "' where id = " + f.data.id;
		pgdb.query(pg, sql);
	} else {
		f._状态 = '状态不是申请中,不能作废';
		return f;
	}
	
	sql="insert into 商_商品审核表(商品名称,作废原因,作废时间,状态,录入人,录入时间)values('"+f.data.商品名称+"','"+f.data.作废原因+"','"+f.date+"','正常','"+f.session.user_name+"','"+f.date+"')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
         return f;
        }
	return f;
}
