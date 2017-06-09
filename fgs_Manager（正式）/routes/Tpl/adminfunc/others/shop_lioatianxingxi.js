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
		if(f.data.发送者 != null && f.data.发送者 != ''){
			where += "and 发送者 like '%"+f.data.发送者+"%'";
		}
		if(f.data.发送者名称 != null && f.data.发送者名称 != ''){
			where += "and 发送者名称 like '%"+f.data.发送者名称+"%'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	//默认查询所有的数据
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,消息id,发送者,发送者名称,接收者,接收者名称,会话类型,消息类型,消息内容,消息体,通知内容,发送时间,接收时间,签收id,录入人,录入时间,备注   from im_聊天信息表  where " + where;
  	}else{
  		p.sql = "select id,消息id,发送者,发送者名称,接收者,接收者名称,消息类型,消息内容,消息体,通知内容,发送时间,接收时间,签收id,录入人,录入时间,备注   from im_聊天信息表  where  "+where;
  	}
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
		"名称": "im_聊天信息",
		"模块": "adminfunc",
		"func": "shop_lioatianxingxi",
		"页数": "10",
		"表名": "im_聊天信息表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}