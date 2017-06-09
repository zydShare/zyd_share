/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = this.json();
	p.表名 = '商_送货地址表';
	f = share.update(p, f, pg);
	//console.log(f);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */
//select id,账号,省,市,区,地址,手机号,收货人,状态,类别,录入人,录入时间  from 商_送货地址表  where
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = this.json();
	//console.log(f);
	var sql = '';
//	insert into 商_送货地址表 (账号,省,市,区,地址,手机号,收货人,状态,类别,录入人,录入时间) values('11','1','22','22','33','11','1','22','22','33','22')
		sql = "select id,账号,省,市,区,地址,手机号,收货人,状态,类别,录入人,录入时间 from 商_送货地址表 where id ='"+f.data.id+"'";
	    s = pgdb.query(pg,sql);
	if(f.data.省 == '' || f.data.省 == null){
		f._状态 = '省不能为空';
		return f;
	}
	if(f.data.市 == '' || f.data.市 == null){
		f._状态 = '地址不能为空';
		return f;
	}
	if(f.data.区 == '' || f.data.区 == null){
		f._状态 = '区不能为空';
		return f;
	}	
	if(f.data.地址 == '' || f.data.地址 == null){
		f._状态 = '地址不能为空';
		return f;
	}
	if(f.data.id != '')
	sql = "update 商_送货地址表  set 账号='"+f.data.账号+"',省='"+f.data.省+"',市='"+f.data.市+"',区='"+f.data.区+"',地址='"+f.data.地址+"',手机号='"+f.data.手机号+"',收货人='"+f.data.收货人+"',状态 = '"+f.data.状态+"',类别='"+f.data.类别+"',录入人='"+f.session.user_name+"',录入时间 = '"+f.date+"' where id ='"+f.data.id+"'";
	pgdb.query(pg,sql);
	
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "更改送货地址",
		"模块": "adminconfunc",
		"func": "shop_songhuodizhi_update",
		"页数": "10",
		"表名": "商_送货地址表"
	};
	return json;
}

