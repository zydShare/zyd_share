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
		if(f.data.城市 != null && f.data.城市 != ''){
			where += "and 城市 like '%"+f.data.城市+"%'";
		}
		if(f.data.名称 != null && f.data.名称 != ''){
			where += "and 名称 like '%"+f.data.名称+"%'";
		}
		if(f.data.省id != null && f.data.省id != ''){
			where += " and  省id = '" + f.data.省id + "'";
		}
		if(f.data.邮编 != null && f.data.邮编 != ''){
			where += "and 邮编 like '%"+f.data.邮编+"%'";
		}
		if(f.data.区号 != null && f.data.区号 != ''){
			where += "and 区号 like '%"+f.data.区号+"%'";
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
         p.sql = "select id,城市,名称,省id,邮编,区号,状态,类别 ,录入人,录入时间   from 平_市级表  where " + where;
  	}else{
  		p.sql = "select id,城市,名称,省id,邮编,区号,状态,类别 ,录入人,录入时间   from 平_市级表  where "+where;
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
		"名称": "市级",
		"模块": "adminfunc",
		"func": "city_level",
		"页数": "10",
		"表名": "平_市级表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}