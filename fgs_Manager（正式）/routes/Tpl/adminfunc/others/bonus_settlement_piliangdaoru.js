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
	p.表名 = '商_奖金结算明细表';
    f.r = {}
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	//	insert into 商_奖金结算明细表(日志id, 结算单号, 账号, 姓名, 关联号, 购买姓名, 购买手机, 套餐, round(应结积分,2) as 应结积分, round(实结积分,2) as 实结积分, 奖金类别, 状态, 类别, 录入人, 录入时间) values('1223','1','1103','323','655','1223','232','232','323','655','1223','232','232','323','655')
	//	var sql="select * from 商_奖金结算明细表";
	//	console.log("-=================================-----------------")
	//	var tt=pgdb.query(pg, sql);
	//	console.log(tt);
	//	console.log("-===============2222==================-----------------")
	f._json = this.json();
	if(f.data.奖金类别 == ''){
		f._状态 = '请选择奖金类别';
		return f;
	}
	var sql = "select id,账号,姓名,状态,类别,关联号,关联姓名,奖金类别,应发积分,实发积分,父id,套餐,支付方式,录入人,录入时间 from 商_奖金日志表 where 录入时间 >= '" + f.data.开始日期 + "' and 录入时间 <= '" + f.data.结束日期 + "' and 状态 = '未结算' and 奖金类别  like '%" + f.data.奖金类别 + "%'";
	var sqld = pgdb.query(pg, sql);
	console.log(sqld.数据)
	
	var arraya = [];
	var 数据 = sqld.数据;
	var sqlfh = "";
	if(数据.length < 1) {
		f._状态 = '日志表中无数据';
		return f;
	}
	var ids = [];
	var sym3 = '';
	var sql_detail ='';
	for(var i = 0; i < 数据.length; i++) {
		sql_detail += sym3 + "('" + 数据[i].账号 + "','" + 数据[i].姓名 + "','结算中','" + 数据[i].类别 + "','" + 数据[i].奖金类别 + "','" + 数据[i].id + "','" + f.data.结算单号 + "','" + 数据[i].关联号 + "','" + 数据[i].关联姓名 + "','','" + 数据[i].应发积分 + "','" + 数据[i].实发积分 + "','" + f.session.user_name + "','" + 数据[i].录入时间 + "','" + 数据[i].套餐 + "')";
		if(sym3 == '')sym3 = ',';
		ids.push(数据[i].id);
	}
	var ids_str = ids.join(',');

	var sqlt = "update 商_奖金日志表 set 状态 = '结算中' where id in (" + ids_str + ") ";
	pgdb.query(pg, sqlt);
	var sqllog = "insert into 商_奖金结算明细表(账号,姓名,状态,类别,奖金类别,日志id,结算单号,关联号,购买姓名,购买手机,应结积分,实结积分,录入人,录入时间,套餐) values " + sql_detail;
	var tblog = pgdb.query(pg, sqllog);
		  s = pgdb.query(pg, tblog);
          if(s.状态 != '成功'){
             f._状态='提交失败'
             return f;
          }
	var ssql = "select sum(应结积分) as 应结积分,sum(实结积分) as 实结积分 from 商_奖金结算明细表 where 结算单号=" + f.data.结算单号;
	var tsql = pgdb.query(pg, ssql);
	f.应结积分 = tsql.数据[0].应结积分;
	f.实结积分 = tsql.数据[0].实结积分;
	sql = "update 商_奖金结算表 set 应结积分 = '" + f.应结积分 + "' ,实结积分 = '" + f.实结积分 + "'  where id =" + f.data.结算单号;
	pgdb.query(pg, sql);
	return f;
}

module.exports.json = function() {
	var json = {
		"名称": "批量导入明细",
		"模块": "adminfunc",
		"func": "bonus_settlement_piliangdaoru",
		"页数": "10",
		"表名": "商_奖金结算明细表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}