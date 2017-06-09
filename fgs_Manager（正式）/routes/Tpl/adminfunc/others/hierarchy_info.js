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
			where += "and 账号 = '"+f.data.账号+"'";
		}
		if(f.data.昵称 != null && f.data.昵称 != ''){
			where += "and 昵称 = '"+f.data.昵称+"'";
		}
		if(f.data.层1上级 != null && f.data.层1上级 != ''){
			where += "and 层1上级 = '"+f.data.层1上级+"'";
		}
		if(f.data.层1名称 != null && f.data.层1名称 != ''){
			where += "and 层1名称 = '"+f.data.层1名称+"'";
		}
	}
	//默认查询所有的数据
	
  		p.sql = "select id,唯一id,账号,昵称,状态,超级商家,类别,层1上级,层1名称  from 平_会员表  where "+where;
  	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	//console.log(p.sql);
	f = share.lists(p, f, pg);
//	console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "层级关系列表",
		"模块": "adminconfunc",
		"func": "hierarchy_info",
		"页数": "10",
		"表名": "平_会员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}