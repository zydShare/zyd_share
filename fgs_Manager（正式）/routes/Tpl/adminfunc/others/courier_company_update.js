/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var courier = require('./courier_company.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = courier.json();
	p.表名 = '商_快递公司表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
module.exports.form = function(f, pg, mo) {
var pgdb = require('../../../func/pgdb.js');
	//更改
	f._json = courier.json();
	if(f.data.id != '')
		sql = "update 商_快递公司表 set 名称='" + f.data.名称 + "', 联系方式='" + f.data.联系方式 + "', 类别='" + f.data.类别 + "', 状态='" + f.data.状态 + "' where id = " + f.data.id;
	else if(f.data.id == '')
		sql = "insert into 商_快递公司表 (名称, 联系方式, 类别, 状态, 录入人, 录入时间, 备注) values ('" + f.data.名称 + "', '" + f.data.联系方式+ "', '" + f.data.类别+ "', '" + f.data.状态 + "', '" + f.session.user_name + "', '" + f.date + "', '" + f.data.备注 + "')";
	  s = pgdb.query(pg, sql);
     if(s.状态 != '成功'){
        f._状态='提交失败'
        return f;
      }
	//sqlite.close(db);
	
	return f;
}
