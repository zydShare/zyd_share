/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var bank_card= require('./hongliexchange.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = bank_card.json();
	p.表名 = '三_黑名单表';
	f = share.update(p, f, pg);
	//console.log(f);
	return f;
}


/*
 *添加黑名单表
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = bank_card.json();
	if(f.data.账号 == "" || f.data.账号 == "null" || f.data.账号 == undefined){
		f._isRander = "请输入账号!";
		return f;
	}
	if(f.data.姓名 == "" || f.data.姓名 == "null" || f.data.姓名 == undefined){
		f._isRander = "请输入姓名!";
		return f;
	}
	var sql = "insert into 三_黑名单表 (账号,姓名, 类别, 状态,录入人,录入时间 ,说明,备注) values('"+f.data.账号+"','"+f.data.姓名+"','"+f.data.类别+"','"+f.data.状态+"','"+f.session.user_name+"','"+f.date+"','"+f.data.说明+"','"+f.data.备注+"')"
//	f.更新信息 = pgdb.query(pg,sql);
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功'){
		f._状态='提交失败';
		return f;
	}
	return f;
}