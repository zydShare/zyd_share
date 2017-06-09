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
		if(f.data.id != null && f.data.id != ''){
			where += " and  id = '" + f.data.id + "'";
		}
                if(f.data.类别 != null && f.data.类别 != ''){
			where += " and  类别 = '" + f.data.类别 + "'";
		}
		if(f.data.模板 != null && f.data.模板 != ''){
			where += " and  模板 = '" + f.data.模板 + "'";
		}
		if(f.data.短信 != null && f.data.短信 != ''){
			where += " and  短信 = '" + f.data.短信 + "'";
		}
		if(f.data.app != null && f.data.app != ''){
			where += " and  app = '" + f.data.app + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != ''){
			where += "and 录入时间 >= '"+f.data.开始日期+" 00:00:00'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != ''){
			where += "and 录入时间 <= '"+f.data.结束日期+" 23:59:59'";
		}
	}
	var str =JSON.stringify(f.data);
	 if(str.length == 2){
         p.sql = "select id,类别,模板,说明,短信,app,录入人,录入时间  from 平_短信模板表  where "+ where;
  	}else{
  		p.sql = "select id,类别,模板,说明,短信,app,录入人,录入时间  from 平_短信模板表  where "+ where;
  	}	
	
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	//console.log(f.r);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "短信模板",
		"模块": "adminfunc",
		"func": "duanxin_moban",
		"页数": "10",
		"表名": "平_短信模板表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}