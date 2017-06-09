/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var hongbaoguige = require('./hongbaoguige.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = hongbaoguige.json();
	p.表名 = '三_参数设置表';
	f = share.update(p, f, pg);
	//console.log(f);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	
	var id = "";
	if(f.data.id != "" || f.data.id != null) {
		id = f.data.id;
		
	}
	var sql = "update 三_参数设置表  set 名称 = '"+f.data.名称+"',参数 = '"+f.data.参数+"',类型 = '"+f.data.类型+"',备注 = '"+f.data.备注+"',录入人 = '"+f.session.user_name+"',录入时间='"+f.date+"' where id ='"+id+"'"
	f.更新信息 = pgdb.query(pg,sql);
	return f;
}