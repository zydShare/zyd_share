/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var user = require('./vip_info.js');
var pgdb = require('../../../func/pgdb.js');
var uuid = require('uuid');

var cipher = require('../../../func/cipher.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f.r = [];
	f.s=[];
	var p = {};
	f = control.index(f);
	f._json = user.json();
if(f.arg.id != null && f.arg.id != '' && f.arg.id != 'undefined'){
	var sql = "select * from 平_会员表 where id = '"+f.arg.id+"'";
	var result = pgdb.query(pg,sql);
	f.r = result.数据[0];
	var 账号 = result.数据[0].账号;
	p.表名 = '平_会员资料表';
	var sql2 = "select * from 平_会员资料表 where 账号 = '"+账号+"'";
	var s = pgdb.query(pg,sql2);
	f.s=s.数据[0];
}else{
			f.r.唯一id=uuid.v1();
            f.r.随机码=uuid.v4();
}
	return f;
}
//更改接口
/*
 * 修改类别
 */
//id,手机号,超级商家,红利账户,层一上级,层一名称,,出账,token,商金币,油费账户,商城收益,积分账户,备注

//id 账号 头像 性别 职业 年龄 生日 个性签名 位置 状态 类别 录入人 录入时间 地址
module.exports.form = function(f, pg, mo) {
	f._json = user.json();
if(f.data.id != null && f.data.id != '' && f.data.id != 'undefined'){
		var sql = "update 平_会员表  set 手机号='"+f.data.手机号+"',超级商家='"+f.data.超级商家+"',红利账户='"+f.data.红利账户+"',层1上级='"+f.data.层1上级+"',层1名称='"+f.data.层1名称+"',出账='"+f.data.出账+"',token='"+f.data.token+"',商金币='"+f.data.商金币+"',油费账户='"+f.data.油费账户+"',商城收益='"+f.data.商城收益+"',积分账户='"+f.data.积分账户+"' where id = '"+f.data.id+"'";
	    pgdb.query(pg, sql);
//
	var sql = "update 平_会员资料表 set 头像 = '"+f.data.头像+"',性别 = '"+f.data.性别+"',职业 = '"+f.data.职业+"',年龄 = '"+f.data.年龄+"',生日 = '"+f.data.生日+"',个性签名 = '"+f.data.个性签名+"',位置 = '"+f.data.位置+"',地址 = '"+f.data.地址+"' where 账号 = '"+f.data.账号+"'";
	pgdb.query(pg, sql);
	
}else{
	//console.log(f.data.登录密码)
	f.data.登录密码 = cipher.md5(f.data.登录密码);
	f.data.支付密码 = cipher.md5(f.data.支付密码);
	var sql = "insert into 平_会员表 (账号,唯一id,手机号,昵称,超级商家,红利账户,登录密码,支付密码,层1上级,层1名称,随机码,出账,token,状态,类别,商金币,油费账户,商城收益,积分账户,录入人,录入时间) values ('" + f.data.账号+ "','" + f.data.唯一id+ "','" + f.data.手机号+ "', '" + f.data.昵称 + "','" + f.data.超级商家+ "', '" + f.data.红利账户 + "','" + f.data.登录密码+ "', '" + f.data.支付密码 + "','" + f.data.层1上级+ "', '" + f.data.层1名称 + "','" + f.data.随机码+ "', '" + f.data.出账 + "','" + f.data.token+ "', '正常','准会员', '" + f.data.商金币 + "','" + f.data.油费账户+ "', '" + f.data.商城收益 + "','" + f.data.积分账户 + "', '" + f.session.user_name + "', '" + f.date + "')";
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
	var sql2 = "insert into 平_会员资料表 (账号,头像,性别,职业,年龄,生日,个性签名,位置,状态,类别,地址,录入人,录入时间 ) values ('" + f.data.账号+ "', '" + f.data.头像 + "','" + f.data.性别+ "', '" + f.data.职业 + "','" + f.data.年龄+ "', '" + f.data.生日 + "','" + f.data.个性签名+ "', '" + f.data.位置 + "','正常', '准会员','" + f.data.地址+ "', '" + f.session.user_name + "', '" + f.date + "')";
	  s = pgdb.query(pg, sql2);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
}
return f;
}
