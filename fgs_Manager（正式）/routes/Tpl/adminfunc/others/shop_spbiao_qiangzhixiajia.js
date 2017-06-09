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
	p.表名 = '商_商品表';
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');
//强制下架
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	var sql = "select  上架状态 from  商_商品表    where id = '"+f.data.id+"'";
	var a = pgdb.query(pg, sql);
	var zhuangtai = a.数据[0].上架状态
	if(zhuangtai == '否'){
		f._状态 = '已下架,请勿重复下架！';
		return f;
		
	}
	sql = "update 商_商品表  set 上架状态='否'  where id='" + f.data.id + "'";
	pgdb.query(pg, sql);
	if(f.data.下架原因 == '其他') f.data.下架原因 = f.data.其他;
	sql = "insert into 商_商品下架表 (账号,商品名称,下架原因,下架时间,状态,录入人,录入时间,备注) values ('" 
	+ f.data.账号 + "','" + f.data.商品名称 + "', '" + f.data.下架原因 + "', '" + f.date 
	+ "','正常','" + f.session.user_name + "', '" + f.date + "', '')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
	return f;
}
//配制
module.exports.json = function() {
	var json = {
		"名称": "商_商品表",
		"模块": "adminfunc",
		"func": "shop_spbiao_qiangzhixiajia",
		"页数": "10",
		"表名": "商_商品表"
	};
	return json;
}

