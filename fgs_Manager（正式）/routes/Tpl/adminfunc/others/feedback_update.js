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
	p.表名 = '平_意见反馈表';
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');


//编辑反馈处理
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	var sql = "update 平_意见反馈表  set 反馈类别='"+f.data.反馈类别+"',处理进度='"+f.data.处理进度+"',处理结果='"+f.data.处理结果+"',处理完成时间='"+f.date+"'  where id = '"+f.data.id+"'";
	pgdb.query(pg, sql);
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "反馈处理",
		"模块": "adminfunc",
		"func": "feedback_update",
		"页数": "10",
		"表名": "平_意见反馈表"
	};
	return json;
}

