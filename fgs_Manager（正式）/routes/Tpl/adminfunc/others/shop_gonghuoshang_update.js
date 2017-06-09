/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var cipher = require('../../../func/cipher.js');
var pgdb = require('../../../func/pgdb.js');
var uuid = require('uuid');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
    f.r = [];
	f = control.index(f);
	f._json = this.json();
	if(f.arg.id != null && f.arg.id != '' && f.arg.id != 'undefined'){
			var sql = "select * from 商_供货商表 where id = '"+f.arg.id+"'";
	        var result = pgdb.query(pg,sql);
	        f.r = result.数据[0];
	}else{
			f.r.唯一id=uuid.v1();
            f.r.随机码=uuid.v4();
	}

	return f;
}

//更改接口
/*
 * 更新：有id值
 */
//select id,账号,真实名,手机号,登录密码,支付密码,昵称,性别,头像,状态,类别,token,层1账号,层1姓名,随机码,总收益,店铺id,
//超级商家,权限名,录入人,录入时间,备注  from 商_供货商表
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	//console.log(f);
	var sql = '';
//	insert into 商_送货地址表 (账号,省,市,区,地址,手机号,收货人,状态,类别,录入人,录入时间) values('11','1','22','22','33','11','1','22','22','33','22')
	if(f.data.id != ''){
	sql = "update 商_供货商表  set id='"+f.data.id+"',账号='"+f.data.账号+"',手机号='"+f.data.手机号+"',昵称='"+f.data.昵称+"',性别='"+f.data.性别+"',头像 = '"+f.data.头像+"',状态='"+f.data.状态+"',类别='"+f.data.类别+"',token='"+f.data.token+"',层1账号='"+f.data.层1账号+"',层1姓名 = '"+f.data.层1姓名+"',随机码='"+f.data.随机码+"',唯一id='"+f.data.唯一id+"',店铺id = '"+f.data.店铺id+"',超级商家='"+f.data.超级商家+"',权限名 = '"+f.data.权限名+"',录入人='"+f.session.user_name+"',录入时间 = '"+f.date+"',备注 = '"+f.data.备注+"' where id ='"+f.data.id+"'";
	pgdb.query(pg,sql);		
	}else{
			f.data.登录密码 = cipher.md5(f.data.登录密码);
	        f.data.支付密码 = cipher.md5(f.data.支付密码);
		sql = "insert into 商_供货商表 (账号,手机号,登录密码,支付密码,昵称,性别,头像,状态,类别,token,层1账号,层1姓名,随机码,店铺id,唯一id,超级商家,权限名,录入人,录入时间,备注) values ('" + f.data.账号 + "','" + f.data.手机号 + "','" + f.data.登录密码 + "','" + f.data.支付密码 + "','" + f.data.昵称 + "','" + f.data.性别 + "','" + f.data.头像 + "','" + f.data.状态 + "','" + f.data.类别 + "','" + f.data.token + "','" + f.data.层1账号 + "','" + f.data.层1姓名 + "','" + f.data.随机码 + "','" + f.data.店铺id + "','" + f.data.唯一id + "','" + f.data.超级商家 + "','" + f.data.权限名 + "','" + f.session.user_name + "','" + f.date + "','" + f.data.备注 + "')";
	     s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	}

	return f;
}
//insert into 商_供货商表 (id,账号,真实名,手机号,登录密码,支付密码,昵称,性别,头像,状态,类别,token,层1账号,层1姓名,随机码,总收益,店铺id,超级商家,权限名,录入人,录入时间,备注) values('11','1','22','22','33','11','1','22','22','33','22','11','1','22','22','33','11','1','22','22','33','22','222')
//配制
module.exports.json = function() {
	var json = {
		"名称": "更改供货商",
		"模块": "adminconfunc",
		"func": "shop_gonghuoshang_update",
		"页数": "10",
		"表名": "商_供货商表"
	};
	return json;
}

