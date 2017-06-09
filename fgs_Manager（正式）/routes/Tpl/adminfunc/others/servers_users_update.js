/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var servers_users = require('./servers_users.js');
var uuid = require('uuid');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f.r = [];
	var p = {};
	f = control.index(f);
	f._json = servers_users.json();
	if(f.arg.id != null && f.arg.id != '' && f.arg.id != 'undefined'){
			 sql="select id,账号,服务账号id,唯一id,随机码,状态,类别,录入人,录入时间,备注 from 平_服务号用户表 where id = '"+f.arg.id+"'";
	         f.r = pgdb.query(pg, sql).数据[0];
	}else{
		    f.r.唯一id=uuid.v1();
                    f.r.随机码=uuid.v4();
	}
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

//	 var id = uuid.v1();
//	 唯一id
//	 var shu=uuid.v4();
var cipher = require('../../../func/cipher.js');
module.exports.form = function(f, pg, mo) {
	f._json = servers_users.json();
	if(f.data.id != ''){
		var sqla="select 账号,服务账号id from 平_服务号用户表 where id ='"+f.data.id+"'";
		var lists=pgdb.query(pg, sqla);
		var serverId = lists.数据[0].服务账号id;
		if(serverId != f.data.服务账号id){
			sqla="select id from 平_服务号用户表 where 服务账号id ='"+f.data.服务账号id+"'";
			var lists=pgdb.query(pg, sqla);
			if(lists.数据.length > 0){
				f._状态='服务账号id已经存在！';
	            return f;
			}		
		}
		 if(f.data.登录密码!=''){
		 	var 登录密码 = cipher.md5(f.data.登录密码);  
		 	sql = "update 平_服务号用户表 set 服务账号id='" + f.data.服务账号id + "',登录密码='"+登录密码+"',状态='"+ f.data.状态 +"',类别='"+ f.data.类别 +"' where id = " + f.data.id;
		    var ee=pgdb.query(pg, sql);
		 }else{
		 	sql = "update 平_服务号用户表 set 服务账号id='" + f.data.服务账号id + "',状态='"+ f.data.状态 +"',类别='"+ f.data.类别 +"' where id = " + f.data.id;
		    pgdb.query(pg, sql);
		 }
		
	}else if(f.data.id == ''){
		var 登录密码 = cipher.md5(f.data.登录密码);
		var sqlb="select id from 平_服务号用户表 where 账号 ='"+f.data.账号+"'";
		var listz=pgdb.query(pg, sqlb);
		if(listz.数据.length > 0){
			f._状态='账号已经存在！';
            return f;
		}
		sqla="select id from 平_服务号用户表 where 服务账号id ='"+f.data.服务账号id+"'";
		var lists=pgdb.query(pg, sqla);
		if(lists.数据.length > 0){
			f._状态='服务账号id已经存在！';
            return f;
		}
		sql = "insert into 平_服务号用户表 (账号,服务账号id,唯一id,登录密码,随机码,状态,类别,录入人,录入时间) values ('" + f.data.账号 + "','" + f.data.服务账号id + "','" + f.data.唯一id+ "','" + 登录密码 + "','" + f.data.随机码 + "','" + f.data.状态 + "','" + f.data.类别 + "','" + f.session.user_name + "', '" + f.date + "')";
	      s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._状态='提交失败'
    return f;
  }
	}
		
	return f;
}
