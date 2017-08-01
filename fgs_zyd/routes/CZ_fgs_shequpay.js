/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：创建加入社区代理分公司支付
 */

var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var logs = require('../func/logs.js');
var mongo = require('../func/mongo.js');
var pgdb = require('../func/pgdb.js');
var common = require('../func/common.js');
var request = require('../func/request.js');
var txsms = require('../func/txsms.js');
var rongcloud = require('../func/rongcloud.js');
var moment = require("moment");
var transliteration = require('transliteration');
var fs = require('fs');
var sign = require('../func/sign.js');

module.exports.run = function (body, pg, mo) {
	console.log("aaaaaaaaaaa");
    var p = {};
    f = body.data;
    var sql = "";
    var field = "";
    var 时间 = moment().format('YYYY-MM-DD HH:mm:ss');
    var 日期 = moment().format('YYYY-MM-DD');
    var 分钟 = moment().format('HH:mm:ss');
    var server = config.get('server');
    var 说明 = JSON.stringify(f);
    p._isRander = 'SUCCESS';
	if(f.商户订单号  =='' || f.商户订单号  ==null || f.商户订单号  == undefined)
	{
		p.状态='商户订单号不能为空';
		return p;
	}
	if(f.总金额  == '' || f.总金额  ==null || f.总金额  == undefined)
	{
		p.状态='总金额不能为空';
		return p;
	}
	
	
/*业务处理*/
	sql = "select id, 账号,每股赠送个数, 姓名, 名称, 编号, 省, 市,区, 分公司设置id, 分公司设置名称, 层1分公司名称, 层1分公司id, 层2分公司名称, 层2分公司id, 层3分公司名称, 层3分公司id, 金额, 股数, 支付方式, 状态, 类别, 分公司密码,上级,上级姓名  from 分_分公司申请表  where 商户订单号 = '" + f.商户订单号 + "'";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='无此支付订单';
		return p;
	}
	if(result.数据[0].状态 == '已支付')
	{
		p.状态='此订单已支付';
		return p;
	}
	if(result.数据[0].状态 == '未支付')
	{
		var 开=result.数据[0];
		f.申请id=开.id;
		f.分公司编号 = 开.编号;
		f.分_名称 = 开.名称;
		f.分公司设置id = 开.分公司设置id;
		f.分公司设置名称 = 开.分公司设置名称;
		f.层1分公司id = 开.层1分公司id;
		f.层1分公司名称 = 开.层1分公司名称;
		f.层2分公司名称 = 开.层2分公司名称;
		f.层2分公司id = 开.层2分公司id;
		f.层3分公司名称 = 开.层3分公司名称;
		f.层3分公司id = 开.层3分公司id;
		f.省 = 开.省;
		f.市 = 开.市;
		f.区 = 开.区;
		f.上级 = 开.上级;
		f.上级姓名 = 开.上级姓名;
		f._金额 = 开.金额;
		f.开_姓名 = 开.姓名;
		f.手机号 = 开.账号;
		f.开_股数 = 开.股数;
		f.开_类别 = 开.类别;
		f.开_状态 = 开.状态;
		f.开_id = 开.id;
		f.开_省 = 开.省;
		f.开_市 = 开.市;
		f.开_密码 = 开.分公司密码;
		f.r_支付方式 = 开.支付方式;
		f.每股赠送个数=开.每股赠送个数;
	}
	
	
    
	
	sql = "select sum(股数) as 总持股数  from 分_分公司申请表  where 账号 = '" + f.手机号 + "' and 编号 = '" + f.分公司编号 + "' and 状态 = '已支付'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length > 0)
	{
		if(Number(result2.数据[0].总持股数) > 10)
		{
			p.状态='抱歉，您所购买的总股份数已经超过10股，暂时不能继续购买该公司的股数！';
			return p;
		}
	}
	
	sql = "select id,赠送积分,日返积分,加盟费,名称 from 分_加盟设置表 where id='1'";
	console.log(sql);
	var result1=pgdb.query(pg,sql);
	if(result1.数据.length == 0)
	{
		p.状态='加盟设置表无此套餐';
		return p;
	}
	else
	{
		f.套餐id=result1.数据[0].id;
		f.全名称=result1.数据[0].名称;
		f.全赠送积分=result1.数据[0].赠送积分;
		f.全日返积分=result1.数据[0].日返积分;
		f.全加盟费=result1.数据[0].加盟费;
	}
	
	sql = "select 俱乐部id, 俱乐部名称 from 分_俱乐部账户关系表 where 发放部门= '七大'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='俱乐部账户关系表数据错误';
		return p;
	}
	else
	{
		f.七大俱乐部id=result2.数据[0].俱乐部id;
		f.七大俱乐部名称=result2.数据[0].俱乐部名称;
	}
	
	sql = "select 俱乐部id, 俱乐部名称 from 分_俱乐部账户关系表 where 发放部门= '全球'";
	var result3=pgdb.query(pg,sql);
	if(result3.数据.length == 0)
	{
		p.状态='俱乐部账户关系表数据错误.';
		return p;
	}
	else
	{
		f.全俱乐部id = result3.数据[0].俱乐部id;
		f.全俱乐部名称 = result3.数据[0].俱乐部名称;
	}
	
	
	sql = "select id,名称,单股金额,创建数量,全球提成,七大提成,上级提成,类别,名称,股数  from 分_分公司设置表 where id='" + f.分公司设置id + "' and 名称='" + f.分公司设置名称 + "'";
	var result4=pgdb.query(pg,sql);
	if(result4.数据.length == 0)
	{
		p.状态='分公司设置表数据错误';
		return p;
	}
	else
	{
		f.分_设置id = result4.数据[0].id;
		f.分_设置类别 = result4.数据[0].类别;
		f.分_设置名称 = result4.数据[0].名称;
		f.分_设置单股金额 = result4.数据[0].单股金额;
		f.分_设置创建数量  = result4.数据[0].股数;
		f.分_设置全球提成 = result4.数据[0].全球提成;
		f.分_设置七大提成 = result4.数据[0].七大提成;
		f.分_设置上级提成 = result4.数据[0].上级提成;
	}
	
	f.全球提成 = f.分_设置全球提成 * f.开_股数;
	f.七大提成 = f.分_设置七大提成 * f.开_股数;
	f.上级提成 = f.分_设置上级提成 * f.开_股数;
//	f.全返套餐表消费账户 = f.开_股数 * 100000;
//	f.全返套餐赠送积分 = f.开_股数 * 30;
//	f.全返套餐总金额 = f.开_股数 * 21390;
//	f.全返套餐表数量 = f.开_股数 * 10;
	
	sql = "SELECT nextval('分_开卡日志表_id_seq') as 开卡日志表_id";
	var pp=pgdb.query(pg,sql);
	f.开卡日志表_id=pp.数据[0].开卡日志表_id;
	
	sql = "SELECT nextval('分_全返套餐表_id_seq') as 全返套餐表_id";
	var pp1=pgdb.query(pg,sql);
	f.全返套餐表_id = pp1.数据[0].全返套餐表_id;
	
	sql = "SELECT nextval('分_分公司表_id_seq') as 分公司表_id";
	var pp2=pgdb.query(pg,sql);
	f.分公司表_id = pp2.数据[0].分公司表_id;
	
	sql = "SELECT nextval('分_分公司成员表_id_seq') as 分公司成员表_id";
	var pp3=pgdb.query(pg,sql);
	f.分公司成员表_id = pp3.数据[0].分公司成员表_id;

//平台交付数据(跨平台下单)  
    var r = {};
    r.func = 'p_sel_payment';
    r.appid = server.appid;
    r.mch_id = server.mch_id;
    r.mch_order_id = f.商户订单号;
    r.pay_order_id = '';
    var types = ['appid', 'mch_id', 'mch_order_id', ''];
    r.sign = sign.autograph(r, types, server.key);
    var 交换数据 = request.post(server.xiadan, r);
    if (交换数据.状态 != "成功") {
        logs.write('fgs', f.商户订单号 + '无此支付订单!');
        return;
    }
    var 信息 = 交换数据.信息;
    var 交换数据2 = JSON.parse(信息);
    f.数据状态 = 交换数据2.状态;
    if (f.数据状态 != "成功") 
    {
        p.状态 = f.数据状态;
        return p;
    }

    if (Number(f.总金额) != Number(交换数据2.总金额)) 
    {
        logs.write('fgs', f.商户订单号 + '支付金额异常');
        return;
    }
    f.支付方式 = 交换数据2.一层支付方式 + " " + 交换数据2.二层支付方式;
    sql = "update 分_分公司申请表  set 支付方式 = '" + f.支付方式 + "',状态= '已支付',支付时间 = '" + 时间 + "' where id = '" + f.申请id + "'";
    field = pgdb.query(pg, sql);
    if (field.状态 != '成功') 
    {
        logs.write('scxftc', f.申请id + 'update更改订单异常');
        return;
    }
    
    
/*交互分公司数据*/
if(f.开_类别 == '创建社区代理分公司')
{
    var types = ['appid','filiale_No','filiale_Id','onlyID'];
    var r = {};
    r.func = 'p_ins_filiale';			
    r.mch_id = server.mch_id;
    r.filiale_Type='社区代理分公司';
    r.filiale_No=f.分公司编号;			
    r.filiale_Name=f.分_名称;
    r.filiale_Sheng=f.省;
    r.filiale_Shi=f.市;
    r.filiale_Qu=f.区;
    r.filiale_State='正常';
    r.filiale_Id=f.分公司设置id;
    r.appid = server.appid;
    r.onlyID = f.唯一id;
    r.sign = sign.autograph(r, types, server.key);
    var 交换数据3 = request.post(server.xiadan, r);
    console.log(交换数据3.状态);
    if (交换数据3.状态 != "成功")
    {
        p.状态 = "交互执行失败1!";
        return p;
    }
    var 信息 = 交换数据3.信息;
    var 交换数据22 = JSON.parse(信息);
    f.数据状态2 = 交换数据22.状态;
     console.log(f.数据状态2);
    if (f.数据状态2 != "成功") 
    {
        p.状态 = '交互执行失败2';
        return p;
    }
}
/*交互分公司数据*/   

	if(f.开_类别 == '加入社区代理分公司')
	{
		sql = "select 所占股数 from 分_分公司成员表 where 分公司id ='" + f.分公司编号 + "' and 账号 = '" + f.账号 + "'";
		var result4=pgdb.query(pg,sql);
		if(result4.数据.length == 0)
		{
			f.所占股数=0;
			f.总股份数=0;
		}
		else
		{
			f.所占股数=result4.数据[0].所占股数;
			f.总股份数=Number(f.所占股数) + Number(f.开_股数);
		}
		if(Number(f.总股份数) > 10)
		{
			p.状态='超出该分公司可购买股份';
			return p;
		}
		if(Number(f.总股份数) == Number(f.分_设置创建数量))
		{
			sql = "update 分_分公司表 set 状态='正常'  where 编号='" + f.分公司编号 + "'";
			var aa=pgdb.query(pg,sql);
			if(aa.状态 != '成功')
			{
				p.状态='修改分公司状态执行失败';
				return p;
			}
		}
/*2*/
		sql = "select sum(所占股数) as 所占股数  from 分_分公司成员表 where 分公司id ='" + f.分公司编号 + "'";
		var result5=pgdb.query(pg,sql);
		f.总股份数2 = Number(result5.数据[0].所占股数) + Number(f.开_股数);
		if(Number(f.总股份数2) > f.分_设置创建数量)
		{
			p.状态 = '超出分公司股份限制';
			return p;
		}
		
/*---------*/		
		sql = "select 账号 ,所占股数 from 分_分公司成员表 where 账号 = '" + f.手机号 + "' and 分公司id = '" + f.分公司编号 + "'";
		var result6=pgdb.query(pg,sql);
		if(result6.数据.length == 0)
		{
			sql = "insert into 分_分公司成员表(账号, 姓名, 分公司id, 所占股数, 单股金额, 分公司名称, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.手机号 + "', '" + f.开_姓名 + "', '" + f.分公司编号 + "', '" + f.开_股数 + "', '" + f.分_设置单股金额 + "', '" + f.分_名称 + "', '正常', '股东', '系统', '" + 时间 + "', '')";
			var result7=pgdb.query(pg,sql);
			if(result7.状态  !='成功')
			{
				p.状态='插入成员数据执行失败';
				return p;
			}
		}
		else
		{
			f.所占股数2=result6.数据[0].所占股数;
			f.总份数 = Number(f.所占股数2) + Number(f.开_股数);
			sql = "update 分_分公司成员表 set 所占股数 = '" + f.总份数 + "'  where 账号 ='" + f.手机号 + "' and  分公司id='" + f.分公司编号 + "'";
			var result8=pgdb.query(pg,sql);
			if(result8.状态 !='成功')
			{
				p.状态='更新成员股数执行失败';
				return p;
			}
			
		}		
/*---------*/		
	}
	
	
	if(f.开_类别 == '创建社区代理分公司') 
	{
		sql = "insert into 分_分公司表(id,账号, 姓名, 名称, 地址, 排序, 状态, 类别, 录入人, 录入时间,分公司设置id, 备注, 股数, 层1分公司名称, 层1分公司id, 层2分公司名称, 层2分公司id, 编号, 层3分公司名称, 层3分公司id, 省, 市,区, 分公司密码 )values('" + f.分公司表_id + "','" + f.手机号 + "', '" + f.开_姓名 + "','" + f.分_名称 + "', '' ,0, '临时', '" + f.分公司设置名称 + "', '系统', '" + 时间 + "','" + f.分公司设置id + "', '', '" + f.分_设置创建数量 + "', '" + f.层1分公司名称 + "', '" + f.层1分公司id + "', '" + f.层2分公司名称 + "', '" + f.层2分公司id + "', '" + f.分公司编号 + "', '" + f.层3分公司名称 + "', '" + f.层3分公司id + "', '" + f.省 + "', '" + f.市 + "','" + f.区 + "','" + f.开_密码 + "')";
		console.log(sql);
		var result11=pgdb.query(pg,sql);
		if(result11.状态 != '成功')
		{
			p.状态='插入社区创建分公司数据执行失败';
			return p;
		}
		
		sql = "insert into 分_分公司成员表( id,账号, 姓名, 分公司id, 所占股数, 单股金额, 分公司名称, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.分公司成员表_id + "','" + f.手机号 + "', '" + f.开_姓名 + "', '" + f.分公司编号 + "', '" + f.开_股数 + "', '" + f.分_设置单股金额 + "', '" + f.分_名称 + "', '正常', '创始人', '系统', '" + 时间 + "', '')";
		var result12=pgdb.query(pg,sql);
		if(result12.状态 != '成功')
		{
			p.状态='插入社区分公司创建人数据执行失败';
			return p;
		}
	}
	
/*创建分公司提成录入*/
	if(Number(f.分_设置全球提成) != 0 &&  f.开_类别 =='创建社区代理分公司')
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.全俱乐部id + "', '" + f.全俱乐部名称 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.全球提成 + ", " + f.全球提成 + ", " + f.开_id + "," + f.开_股数 + ", '创建社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司提成_全球', '', '" + 时间 + "', '')";
		var result15=pgdb.query(pg,sql);
		if(result15.状态 != '成功')
		{
			p.状态='插入全球提成执行失败';
			return p;
		}
	}
	
	if(Number(f.分_设置七大提成) != 0 &&  f.开_类别 =='创建社区代理分公司')
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.七大俱乐部id + "', '" + f.七大俱乐部名称 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.七大提成 + ", " + f.七大提成 + ", " + f.开_id + "," + f.开_股数 + ", '创建社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司提成_七大', '', '" + 时间 + "', '')";
		var result16=pgdb.query(pg,sql);
		if(result16.状态 != '成功')
		{
			p.状态='插入全球七大执行失败';
			return p;
		}
	}
	
	if(Number(f.分_设置上级提成) != 0 && (f.上级 !='' && f.上级 !=null && f.上级 !=undefined) &&  f.开_类别 =='创建社区代理分公司')
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.上级 + "', '" + f.上级姓名 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.上级提成 + ", " + f.上级提成 + ", " + f.开_id + "," + f.开_股数 + ", '创建社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司上级提成', '', '" + 时间 + "', '')";
		var result17=pgdb.query(pg,sql);
		if(result17.状态 != '成功')
		{
			p.状态='插入分公司上级执行失败';
			return p;
		}
	}
	
/*加入分公司提成录入*/	
	if(Number(f.分_设置全球提成) != 0 &&  f.开_类别 =='加入社区代理分公司') 
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.全俱乐部id + "', '" + f.全俱乐部名称 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.全球提成 + ", " + f.全球提成 + ", " + f.开_id + "," + f.开_股数 + ", '加入社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司提成_全球1111', '', '" + 时间 + "', '')";
		var result01=pgdb.query(pg,sql);
		if(result01.状态 != '成功')
		{
			p.状态='插入加入分公司全球提成执行失败';
			return p;
		}
	}
	
	if(Number(f.分_设置七大提成) != 0 &&  f.开_类别 =='加入社区代理分公司')
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.七大俱乐部id + "', '" + f.七大俱乐部名称 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.七大提成 + ", " + f.七大提成 + ", " + f.开_id + "," + f.开_股数 + ", '加入社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司提成_七大1111', '', '" + 时间 + "', '')";
		var result02=pgdb.query(pg,sql);
		if(result02.状态 != '成功')
		{
			p.状态='插入加入分公司七大提成执行失败';
			return p;
		}	
	}
	
	if(Number(f.分_设置上级提成) != 0 && (f.上级 !='' && f.上级 !=null && f.上级 !=undefined) &&  f.开_类别 =='加入社区代理分公司')
	{
		sql = "insert into 分_基本日志表( 账号, 姓名,当时类别, 卡号, 卡姓名, 应发积分, 实发积分, 开卡id, 数量,套餐, 支付方式, 状态, 类别, 录入人, 录入时间, 备注 )values('" + f.上级 + "', '" + f.上级姓名 + "','', '" + f.分公司编号 + "', '" + f.分_名称 + "', " + f.上级提成 + ", " + f.上级提成 + ", " + f.开_id + "," + f.开_股数 + ", '加入社区代理分公司提成', '" + f.r_支付方式 + "', '未结算', '分公司上级提成', '', '" + 时间 + "', '')";
		var result03=pgdb.query(pg,sql);
		if(result03.状态 != '成功')
		{
			p.状态='插入加入分公司上级提成执行失败';
			return p;
		}
	}
	
	f.全球套餐数量=Number(f.每股赠送个数)  * f.开_股数;
	f.全球套餐消费账户=Number(f.每股赠送个数) * Number(f.全赠送积分) * f.开_股数;
	f.全球赠送积分=Number(f.每股赠送个数) * Number(f.全日返积分) * f.开_股数;
	f.全球套餐总额=Number(f.每股赠送个数)  * Number(f.全加盟费) * f.开_股数;
	f.日返积分2=Number(f.开_股数) * Number(f.全日返积分);
	
	var fgs={};
	fgs.订单id=f.商户订单号;
	fgs.套餐名称=f.分_名称;
	fgs.类别='新全球套餐';
	fgs.账号=f.手机号;
	fgs.姓名=f.开_姓名;
	fgs.数量=f.全球套餐数量;
	fgs.消费账户=f.全球套餐消费账户;
	fgs.赠送积分=f.全球套餐消费账户;
	fgs.日返积分=f.日返积分2;
	fgs.面值='2339';
	fgs.备注='创建分公司赠送套餐';
	fgs.状态='未生成';
	var huizon=mongo.save(mo,'Package',fgs);
	console.log(fgs);
	var array1=huizon.result;
	console.log(array1.n+"老老老老老老11");
	console.log(array1.ok+"老老老老老老22");
	if(array1.n != 1 && array1.ok !=1)
	{
		console.log('数据执行失败');
		logs.write('fgs', 'mongo插入失败！' + f.商户订单号);
		return;
	}
	
	/*sql = "insert into 分_全返套餐表(id,套餐名称, 卡号, 账号, 姓名, 手机号,数量, 消费账户, 赠送积分, 面值, 日返还积分, 上次返还时间, 状态, 类别, 录入人, 录入时间, 备注 )values(" + f.全返套餐表_id + ",'"+f.全名称+"', " + f.全返套餐表_id + ", '" + f.手机号 + "', '" + f.开_姓名 + "', '" + f.手机号 + "','" + f.全球套餐数量 + "', '" + f.全球套餐消费账户 + "', '" + f.全球套餐消费账户 + "', 2339, '" + f.日返积分2 + "', '" + 时间 + "', '正常', '分公司套餐', '系统', '" + 时间 + "', '')";
	var result04=pgdb.query(pg,sql);
	if(result04.状态 != '成功')
	{
		p.状态='录入商城消费卷套餐执行失败';
		return p;
	}
	sql = "insert into 分_开卡日志表(套餐id, 账号, 姓名, 卡号,支付方式, 上级, 上级姓名, 套餐, 面值, 赠送, 日返积分, 总额, 数量, 支付订单号, 类别, 状态, 录入人, 录入时间, 内容, 备注, 支付时间 )values("+f.套餐id+", '"+f.手机号+"', '" + f.开_姓名 + "', "+f.全返套餐表_id+", '"+f.r_支付方式+"', '"+f.分公司表_id+"', '"+f.分_名称+"', '"+f.全名称+"', 2339, '" + f.全球套餐消费账户 + "', '" + f.日返积分2 + "', '"+f.全球套餐总额+"', '" + f.全球套餐数量 + "', '', '分公司金卡套餐(每股赠送个数套餐)', '已支付', '系统', '" + 时间 + "','','', '" + 时间 + "')";
	var result05=pgdb.query(pg,sql);
	if(result05.状态 != '成功')
	{
		p.状态='开卡日志记录执行失败';
		return p;
	}	*/	
/*创建加入分公司赠送优惠券操作*/	
	/*sql = "select id,名称,积分,类别 from 分_优惠券设置表  where 类别 ='优惠券一'";
	var result06=pgdb.query(pg,sql);
	if(result06.数据.length == 0)
	{
		p.状态='优惠券套餐不存在';
		return p;
	}
	else
	{
		var s=result06.数据[0];
		f.优惠券设置id1=s.id;
		f.优惠券设置类别=s.类别;
		f.优惠券名称1=s.名称;
		f.优惠券积分1=s.积分;
	}
	
	sql = "select id,名称,积分,类别 from 分_优惠券设置表 where  类别 ='优惠券二'";
	var result07=pgdb.query(pg,sql);
	if(result07.数据.length == 0)
	{
		p.状态='优惠券2套餐不存在';
		return p;
	}
	else
	{
		var s=result07.数据[0];
		f.优惠券设置id2=s.id;
		f.优惠券名称2=s.名称;
		f.优惠券设置类别2=s.类别;
		f.优惠券积分2=s.积分;
	}
	
	for (i =0; i< f.开_股数; i++) 
	{
		sql="insert into 分_优惠券表(优惠券设置id,名称,积分,拥有者账号,拥有者姓名,使用者账号,使用者姓名,使用时间,支付方式,状态,类别,录入人,录入时间) values ("+f.优惠券设置id1+",'"+f.优惠券名称1+"',"+f.优惠券积分1+",'"+f.手机号+"','"+f.开_姓名+"','"+f.手机号+"','"+f.开_姓名+"','','"+f.r_支付方式+"','正常','"+f.优惠券设置类别+"','系统','"+时间+"')";
		var result07=pgdb.query(pg,sql);
		if(result07.状态 !='成功')
		{
			p.状态='赠送优惠券1执行失败';
			return p;
		}
		
		sql = "insert into 分_优惠券表(优惠券设置id,名称,积分,拥有者账号,拥有者姓名,使用者账号,使用者姓名,使用时间,支付方式,状态,类别,录入人,录入时间) values ("+f.优惠券设置id2+",'"+f.优惠券名称2+"',"+f.优惠券积分2+",'"+f.手机号+"','"+f.开_姓名+"','"+f.手机号+"','"+f.开_姓名+"','','"+f.r_支付方式+"','正常','"+f.优惠券设置类别2+"','系统','"+时间+"')";
		var result09=pgdb.query(pg,sql);
		if(result09.状态 !='成功')
		{
			p.状态='赠送优惠券2执行失败';
			return p;
		}
	}*/
	p.状态='成功';
	return common.removenull(p);
}