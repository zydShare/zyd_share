var control = require('../../admin_control.js');
var bonus_settlement = require('./bonus_settlement.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	//f = deleteOne(f, pg, mo);
	if(f.isPower == true){
		eval("f = "+f.arg._name+"(f, pg, mo);");	
	}else{
		f._isRander = '无此权限';
	}
	return f;
}

var pgdb = require('../../../func/pgdb.js');

//生成结算单
function scjiesuandan(f, pg, mo){
	var sql = '';
	sql = "insert into 商_奖金结算表 (应结积分,实结积分,订单状态,审核人,审核时间,录入人,录入时间,备注) values ('0.0000','0.0000','未提交','','','" + f.session.user_name + "','" + f.date + "','')";
	pgdb.query(pg, sql);
	  s = pgdb.query(pg, sql);
  if(s.状态 != '成功'){
    f._isRander='提交失败'
    return f;
  }
	f._isRander = '提交成功';
	return f;
}

//提交结算单
function tijiaojsd(f, pg, mo){
	var sql = '';
	sql = "select 订单状态  from 商_奖金结算表 where id = " + f.arg.id;
	var sqla=pgdb.query(pg, sql);
	var 数据=sqla.数据[0];
	if(数据.订单状态=='已提交'){
		f._isRander = '已提交,不能重复提交';
		return f;
	}else if(数据.订单状态=='已审批'){
		f._isRander = '已审批,不能提交';
		return f;
	}
	 var sqlb = "update 商_奖金结算表  set 订单状态='已提交',审核时间='" + f.date + "',审核人='" + f.session.user_name + "' where id=" + f.arg.id;
	pgdb.query(pg, sqlb);
	f._isRander = '提交成功';
	return f;
}
	
//取消结算单
function quxiaotijiao(f, pg, mo){
	var sql = '';
	sql = "select 订单状态  from 商_奖金结算表 where id=" + f.arg.id;	
	var sqla=pgdb.query(pg, sql);
	var  数据=sqla.数据[0];
	if(数据.订单状态=='未提交'){
		f._isRander = '对不起,此结算单未提交';
		return f;
	}else if(数据.订单状态=='已审批'){
		f._isRander = '此订单已审批,不能取消提交';
		return f;
	}
	var sql = "update 商_奖金结算表 set 订单状态='未提交' where id=" + f.arg.id;
	var sqla=pgdb.query(pg, sql);
	f._isRander = '提交成功';
	return f;
}

//结算审批

function jiesuansp(f, pg, mo){
	var sql = "select id,订单状态,实结积分 from 商_奖金结算表 where id=" + f.arg.id ;
	var sqla=pgdb.query(pg, sql);
	//console.log('===============订单状态与积分==============');
	//console.log(sqla.数据[0]);
	f.oid = sqla.数据[0].id;
	f.实结积分 = sqla.数据[0].实结积分;
	f.状态 = sqla.数据[0].订单状态;
	if(f.实结积分 == '' || f.状态 == ''){
		f._isRander = '非法数据，积分或订单状态为空';
		return f;
	}
    if(f.状态 == '已审批'){
		f._isRander = '此订单已审批不能再次审批';
		return f;
	}
    if(f.状态 == '未提交'){
		f._isRander = '未提交结算单不能审批';
		return f;
	}
    var sql = "update 商_奖金结算表  set 订单状态='已审批',审核时间='" + f.date + "',审核人='" + f.session.user_name + "' where id=" + f.arg.id;
  //console.log('===========更改=========>'+sql);
    pgdb.query(pg, sql);
    var sql = "update 商_奖金结算明细表  set 状态='已结算' where 结算单号='" + f.oid + "'";
  //console.log('===========更改=========>'+sql);
    pgdb.query(pg, sql);
    var Arr1 = new Array();
    var sql = "select sum(实结积分) as 实结积分,账号,姓名,日志id  from 商_奖金结算明细表  where  状态='已结算' and 结算单号='" + f.oid + "' GROUP BY 账号,姓名,日志id";
    var sqld = pgdb.query(pg, sql);
  //console.log('====================实结积分之和，与相应账号，姓名，日志id=====================')
  //console.log(sqld.数据);
    if(sqld.数据.length == 0 ){
    	f._isRander = '非法数据，奖金结算明细为空';
		return f;
    }
  //console.log('==================遍历数据==================');
	sqld.数据.forEach(function(k, key) {
			var jifen = k.实结积分;
			var zhangh = k.账号;
			var name = k.姓名;
			var logid = k.日志id;
			Arr1.push({ jifen, zhangh, name,logid })
		
	});   
	
 // console.log('============遍历结果===================');
  //console.log(Arr1);
    
    
	Arr1.forEach(function(item) {

		var sql = "update 商_奖金日志表 set 状态 = '已结算' where 账号 = '" + item.zhangh + "'and 状态='结算中' and id = "+item.logid;
		//console.log('=================日志表更改状态================>'+sql);
		pgdb.query(pg, sql);


		//rsql.数据.forEach(function(c) {
		//f.zhangh2 = rsql.数据[0].账号;
		/*f.shouy = rsql.数据[0].商城收益;
		f.总收益 = Number(f.shouy) + Number(item.jifen);*/
		var sql = "update 平_会员表 set 商城收益= 商城收益 + " + Number(item.jifen) + " where 账号='" + item.zhangh + "'";
		//console.log('===============更改总收益=============>'+sql)
		pgdb.query(pg, sql);
		
		var sql = "select 商城收益  from 平_会员表 where 账号 = '" + item.zhangh + "'";
		//console.log('===========会员表取值========>'+sql);
		var rsql = pgdb.query(pg, sql);
		//console.log(rsql.数据[0]);
		f.shouy = rsql.数据[0].商城收益;
		//结算完成插入数据到账户表
		var sql = "insert into 平_账户表(账号,姓名,积分,余额,说明,状态,类别,录入人,录入时间) values('" 
		+ item.zhangh + "','" + item.name + "','" + item.jifen + "','" + f.shouy + "','奖金结算-结算单号：" + f.oid + "','红利结算','收益','"+f.session.user_name+"','" + f.date + "')";
		//console.log('===============新增账户表=============>'+sql);
//		pgdb.query(pg, sql);
		  s = pgdb.query(pg, sql);
          if(s.状态 != '成功'){
             f._isRander='提交失败'
             return f;
          }
		//钱_日志
		//})
		
		sql = "insert into 平_日志_钱表(账号,卡号,时间,ip,类别,状态,录入人,内容,备注) values('"+item.zhangh+"','','"+f.date+"','"+f.ip+"','结算审批','数据提交','"+f.session.user_name+"','奖金结算-结算单号：" + f.oid + "','')"
	   // console.log('===============平_日志_钱表=============>'+sql);
//	    pgdb.query(pg, sql);
		  s = pgdb.query(pg, sql);
          if(s.状态 != '成功'){
             f._isRander='提交失败'
             return f;
          }	    
	})

	f._isRander = '提交成功';
    return f;
}

//删除删除奖金结算
function bonus_settlement_delete(f, pg, mo){
	var sql = "select id,订单状态 from 商_奖金结算表 where id=" + f.arg.id ;
	var sqla=pgdb.query(pg, sql);
	f.状态a = sqla.数据[0].订单状态;
	f.oid = sqla.数据[0].id;
    if(f.状态a == '已审批'){
		f._isRander = '此订单已审批不能删除';
		return f;
	}
    var sql = "select 账号,日志id from 商_奖金结算明细表 where 结算单号='" + f.oid + "'";
    var sqla = pgdb.query(pg, sql);
//  拿到日志id,将日志id状态改为未结算
//  console.log(sqla);
    var 数据=sqla.数据;
    for(var i=0;i<数据.length;i++){
    	var sql = "update 商_奖金日志表  set 状态='未结算' where id='" + 数据[i].日志id + "'";
    	pgdb.query(pg, sql);
    }
    
    var sql = "delete  from 商_奖金结算明细表 where 结算单号='" + f.oid + "'";
    pgdb.query(pg, sql);
    
     var sql = "delete  from 商_奖金结算表 where id='" + f.arg.id + "'";
     pgdb.query(pg, sql);
     f._isRander = '提交成功';
     return f;
}


