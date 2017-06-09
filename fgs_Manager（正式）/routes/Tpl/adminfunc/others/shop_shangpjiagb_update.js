/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = this.json();
	p.表名 = '商_商品价格表';
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');

//更改商品价格
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	var sql = "update 商_商品价格表  set 商品id='"+f.data.商品id+"',供货价='"+f.data.供货价+"',市场价='"+f.data.市场价+"',建议零售价='"+f.data.建议零售价+"',折扣价='"+f.data.折扣价+"',属性id='"+f.data.属性id+"',状态='"+f.data.状态+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"'  where id = '"+f.data.id+"'";
	pgdb.query(pg, sql);
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "商品价格表",
		"模块": "adminfunc",
		"func": "shop_shangpjiagb",
		"页数": "10",
		"表名": "商_商品价格表"
	};
	return json;
}

