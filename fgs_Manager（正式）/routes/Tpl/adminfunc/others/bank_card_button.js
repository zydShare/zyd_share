/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	//console.log(f);
	//f = deleteOne(f, pg, mo);
	eval("f = "+f.arg._name+"(f, pg, mo);");	
	return f;
}


/*
 * 对应着前端的批量修改状态
 */
function deleteClasses(f, pg, mo) {
	
	//console.log("arg.id="+f.arg.id);
	sql = "delete from 三_黑名单表  where id= '"+f.arg.id+"'";
	s = pgdb.query(pg,sql);
	f._isRander = '提交成功';
	return f;
}
