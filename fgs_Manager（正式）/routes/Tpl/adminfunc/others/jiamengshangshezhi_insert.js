/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var jiamengshangshezhi= require('./jiamengshangshezhi.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = jiamengshangshezhi.json();
	p.表名 = '商_加盟设置表';
	share.update(p, f, pg);
	//console.log(f);
	return f;
}


/*
 *添加新的加盟设置
 */

var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = jiamengshangshezhi.json();
	if(f.data.名称 == "" || f.data.名称 == "null" || f.data.名称 == undefined){
		f._isRander = "请输入名称!";
		return f;
	}
	if(f.data.加盟费 == "" || f.data.加盟费 == "null" || f.data.加盟费 == undefined){
		f._isRander = "请输入加盟费!";
		return f;
	}
	if(f.data.商品上传数 == "" || f.data.商品上传数 == "null" || f.data.商品上传数 == undefined){
		f._isRander = "请输入商品上传数!";
		return f;
	}
	if(f.data.升级套餐 == "" || f.data.升级套餐 == "null" || f.data.升级套餐 == undefined){
		f._isRander = "请输入升级套餐!";
		return f;
	}
	if(f.data.状态 == "" || f.data.状态 == "null" || f.data.状态 == undefined){
		f._isRander = "请输入状态!";
		return f;
	}
	
	
	var sql = "insert into 商_加盟设置表(名称,加盟费,商品上传数,说明,升级套餐,状态,录入人,录入时间,备注) values('"+f.data.名称+"','"+f.data.加盟费+"','"+f.data.商品上传数+"','"+f.data.说明+"','"+f.data.升级套餐+"','"+f.data.状态+"','"+f.session.user_name+"','"+f.date+"','"+f.data.备注+"')"
//	f.更新信息 = pgdb.query(pg,sql);
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
//	console.log(sql)
	return f;
}