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
	p.表名 = '商_加盟设置表';
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');

//更改加盟设置
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	var sql = "update 商_加盟设置表  set 名称='"+f.data.名称+"',加盟费='"+f.data.加盟费+"',商品上传数='"+f.data.商品上传数+"',说明='"+f.data.说明+"',升级套餐='"+f.data.升级套餐+"',状态='"+f.data.状态+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"'  where id = '"+f.data.id+"'";
	pgdb.query(pg, sql);
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "商_加盟商设置",
		"模块": "adminfunc",
		"func": "jiamengshangshezhi",
		"页数": "10",
		"表名": "商_加盟设置表"
	};
	return json;
}

