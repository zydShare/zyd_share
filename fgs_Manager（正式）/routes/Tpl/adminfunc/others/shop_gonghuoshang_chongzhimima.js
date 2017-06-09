

/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var cipher = require('../../../func/cipher.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
        f = control.index(f);
	//f = deleteOne(f, pg, mo);
	
         if(f.isPower == true){
		eval("f = "+f.arg._name+"(f, pg, mo);");	
	}else{
		f._isRander = '无此权限';
	}	
	return f;
}

/*
 * 重置密码
 */
function updatepwd(f, pg, mo) {

	
	var sql = "select 手机号 from 商_供货商表   where id ='" + f.arg.id + "'";
	var s = pgdb.query(pg, sql).数据[0];
	//console.log(s);
	var amountLength = s.手机号.length;
	//console.log(amountLength);
	var firstLength = amountLength -6;
	var newPsd = (s.手机号).substring(firstLength,amountLength);
	f.newPsd = cipher.md5(newPsd);
	//console.log(f.newPsd)
	sql ="update 商_供货商表 set 登录密码='"+f.newPsd+"' where id="+ f.arg.id ;
	pgdb.query(pg, sql)
	
	var p = {};
	p.类别 = "重置密码";
	var vipInfo = require('./vip_info');
	f._json = vipInfo.json();
	f._isRander = '提交成功';
	return f;
	
	//return f;
}