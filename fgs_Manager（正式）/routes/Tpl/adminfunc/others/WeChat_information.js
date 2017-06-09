//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	
	//查询条件还没有
	if(f.data != null) {
                if(f.data.账号 != null && f.data.账号 != ''){
			where += " and  账号 = '" + f.data.账号 + "'";
		}
		if(f.data.微信unionid != null && f.data.微信unionid != ''){
			where += "and 微信unionid like '%"+f.data.微信unionid+"%'";
		}
		if(f.data.微信openid != null && f.data.微信openid != ''){
			where += "and 微信openid like '%"+f.data.微信openid+"%'";
		}
		if(f.data.微信id != null && f.data.微信id != ''){
			where += "and 微信id like '%"+f.data.微信id+"%'";
		}
		
		if(f.data.地址 != null && f.data.地址 != ''){
			where += "and 地址 like '%"+f.data.地址+"%'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
	/*var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,账号,微信unionid,微信openid,微信id,性别,地址,头像,类别,状态,录入人,录入时间   from 平_微信信息表  where " + where;
  	}else{*/
  		p.sql = "select id,账号,微信unionid,微信openid,微信id,微信名,性别,地址,头像,类别,状态,录入人,录入时间   from 平_微信信息表  where"+where;
  	//}
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
//	console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "微信信息",
		"模块": "adminfunc",
		"func": "WeChat_information",
		"页数": "10",
		"表名": "平_微信信息表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}