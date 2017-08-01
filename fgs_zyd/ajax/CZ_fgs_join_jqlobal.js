/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：加入市级代理分公司




onlyID=f53cff4d-31b7-40fe-a738-41b57cae570a
分公司编号=0715888888
分公司名称=大苏打实打实
分公司密码=123456
服务商手机号=13635750336
设置id=8
股数=10
金额=239990
协议=啊撒大苏打实打实
 */

var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var share = require('../ajax/public/share.js');
var logs = require('../func/logs.js');
var mongo = require('../func/mongo.js');
var pgdb = require('../func/pgdb.js');
var common = require('../func/common.js');
var request = require('../func/request.js');
var txsms = require('../func/txsms.js');
var moment = require("moment");
var sign = require('../func/sign.js');
var transliteration = require('transliteration');
var fs = require('fs');


module.exports.run = function (body, pg, mo) 
{
    var server = config.get('server');
    var p = {};
	var data = {};
	p.状态 = "成功";
	body.receive = JSON.parse(body.data);
    var f = body.receive;
	var sql = "";
	var 时间 = moment().format('YYYY-MM-DD HH:mm:ss');
	var 日期 = moment().format('YYYY-MM-DD');
	var top = share.top(f.onlyID,pg);
	if (top.状态!="成功")
	{
		p.状态=top.状态;
		return p;
	}
	else
	{
		 f.账号 = top.会.账号;
         f.昵称 = top.会.昵称;
	}
	if(f.分公司编号 == null || f.分公司编号 == '') 
	{
		p.状态 = '请输入要加入的市代理分公司编号';
		return p;
	} 
	if(f.分公司名称 == null || f.分公司名称 == '')
	{
		p.状态 = '分公司名称不能为空';
		return p;
	}
	if(f.分公司密码 == null || f.分公司密码 == '') 
	{
		p.状态 = '请输入市代理公司密码';
		return p;
	}
	if(f.服务商手机号 == f.账号) 
	{
		p.状态 = '服务商不能是自己';
		return p;
	}
	if(f.服务商手机号 == null || f.服务商手机号 == '') 
	{
		p.状态 = '服务商账号不能为空';
		return p;
	}
	if(f.服务商姓名 == null || f.服务商姓名 == '') 
	{
		p.状态 = '请输入正确的服务商账号';
		return p;
	}
	if(f.设置id == null || f.设置id == '') 
	{
		p.状态 = '分公司套餐不能为空';
		return p;
	}
	if(f.金额 == null || f.金额 == '') 
	{
		p.状态 = '金额不能为空';
		return p;
	}
	if(f.股数 == null || f.股数 == '') 
	{
		p.状态 = '股数不能为空';
		return p;
	}
	if(Number(f.股数) <= 0 || Number(f.股数) > 10)
	{	
		p.状态 = '您选择的股数不能小于1股或者大于10股份,请重新输入';
		return p;
	}
	
/*业务处理模块*/	

	
	sql ="select id from 分_分公司表  where  编号='"+f.分公司编号+"' and 类别='市代理分公司'";
	var result = pgdb.query(pg, sql);
	if(result.数据.length == 0)
	{
		p.状态 = '您输入的分公司编号不是市代理分公司，请重新输入';
		return p;
	}
	
	sql = "select * from 分_分公司表  where 编号 = '" + f.分公司编号 + "'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='分公司编号有误,请重新输入';
		return p;
	}
	else
	{
		f.分=result2.数据[0];
	}
	
	sql = "select * from 分_分公司表  where  分公司密码 = '" + f.分公司密码 + "' and 编号='"+f.分公司编号+"'";
	console.log(sql);
	var result23=pgdb.query(pg,sql);
	if(result23.数据.length == 0)
	{
		p.状态='分公司密码有误,请重新输入';
		return p;
	}

	
	/*sql ="select id,账号,姓名 from 分_分公司成员表 where  账号='"+f.服务商手机号+"'";
	var result3=pgdb.query(pg,sql);
	if(result3.数据.length == 0)
	{
		p.状态='服务商必须是分公司的股东身份';
		return p;
	}
	f.上级账号=result3.数据[0].账号;
	f.上级姓名=result3.数据[0].姓名;*/
	f.上级账号=f.服务商手机号;
	f.上级姓名=f.服务商姓名;

	
	sql="select id from 分_分公司设置表 where id='"+f.设置id+"' and 名称='"+f.分.类别+"'";
	console.log(sql);
	var result4=pgdb.query(pg,sql);
	if(result4.数据.length == 0)
	{
		p.状态='选择套餐有误';
		return p;
	}
	
	sql = "select sum(所占股数) as 已分配股数 from 分_分公司成员表  where 分公司id = '" + f.分公司编号 + "'";
	var result5=pgdb.query(pg,sql);
	if(result5.数据.length == 0)
	{
		p.状态='查询数据执行失败';
		return p;
	}
	if(Number(result5.数据[0].已分配股数))
	{
		f.剩余股数=Number(f.分.股数) - Number(result5.数据[0].已分配股数);
		if(Number(result5.数据[0].已分配股数) == Number(f.分.股数))
		{
			p.状态='分公司股份已分配完';
			return p;
		}
		if(Number(f.股数) > Number(f.剩余股数))
		{
			p.状态='分公司剩余股份'+f.剩余股数+',您最多可以购买'+f.剩余股数+'股，请重新输入!';
			return p;
		}
	}
	
	
	sql = "select * from 分_分公司设置表 where id = '" + f.设置id + "' and (状态 ='显示' or 状态 ='显示中')";
	var result6=pgdb.query(pg,sql);
	if(result6.数据.length == 0)
	{
		p.状态='无此类型分公司股份';
		return p;
	}
	else
	{
		f.分设=result6.数据[0];
	}
	
	sql = "select * from 分_分公司成员表  where 分公司id = '" + f.分公司编号 + "' and 账号 = '" + f.账号 + "'";
	var result7=pgdb.query(pg,sql);
	if(result7.数据.length == 0)
	{
		f.所占股数=0;
	}
	else
	{
		f.所占股数=result7.数据[0].所占股数;
	}
	
	var 计算单个成员股数=Number(f.股数) + Number(f.所占股数);
	if(计算单个成员股数 >=11)
	{
		p.状态='抱歉，您所拥有的总股份数不能超过10股，请重新输入';
		return p;
	}
	else
	{
		f.总额=Number(f.股数) * Number(f.分设.单股金额);
	}
	
	
	
/*取到自增id*/	
	sql = "SELECT nextval('分_分公司申请表_id_seq') as 申_id";
	var zzid=pgdb.query(pg,sql);
	f.分申_id = zzid.数据[0].申_id;
	f.商户订单号 = server.mch_id + (98000000000000 + Number(f.分申_id));
/*-----------------------------*/
	 //平台交付数据(跨平台下单)
    var types = ['appid', 'mch_id', 'out_trade_no', 'total_fee'];
    var r = {};
    r.func = 'p_payment_order';
    r.appid = server.appid;
    r.onlyID = f.onlyID;
    r.mch_id = server.mch_id;
    r.out_trade_no = f.商户订单号;
    r.total_fee = Number(f.总额);
    r.body = '加入市级代理分公司';
    r.sign = sign.autograph(r, types, server.key);
    r.notify_url = server.pay_return_url + "/CZ_fgs_shipay.xhtml";
    r.payment_type = server.fgszf;
    var 交换数据 = request.post(server.xiadan, r);
    if (交换数据.状态 != "成功")
    {
        p.状态 = "加入市级代理分公司下单失败!";
        return p;
    }
    var 信息 = 交换数据.信息;
    var 交换数据2 = JSON.parse(信息);
    f.数据状态 = 交换数据2.状态;
    if (f.数据状态 != "成功") 
    {
        p.状态 = '加入市级代理分公司执行失败';
        return p;
    }
/*-----------------------------*/



/*加入市级代理分公司下单*/
	sql="INSERT INTO 分_分公司申请表(账号, 姓名, 名称, 编号, 省, 市, 区,商户订单号, 分公司设置id, 分公司设置名称,上级, 上级姓名, 层1分公司名称, 层1分公司id, 层2分公司名称, 层2分公司id, 层3分公司名称, 层3分公司id,金额, 股数, 支付方式, 支付时间, 支付订单号, 每股赠送个数, 状态, 类别, 录入人, 录入时间, 备注, 密码, 分公司密码)VALUES ('"+f.账号+"', '"+f.昵称+"', '"+f.分公司名称+"', '"+f.分公司编号+"', '"+f.分.省+"', '"+f.分.市+"', '"+f.分.区+"','"+f.商户订单号+"', '"+f.设置id+"', '"+f.分设.名称+"', '"+f.上级账号+"', '"+f.上级姓名+"', '"+f.分.层1分公司名称+"', '"+f.分.层1分公司id+"', '"+f.分.层2分公司名称+"', '"+f.分.层2分公司id+"','"+f.分.层3分公司名称+"', '"+f.分.层3分公司id+"', '"+f.总额+"', '"+Number(f.股数)+"', '', '', '', '"+f.分设.每股赠送个数+"', '未支付', '加入市代理分公司', '系统', '"+时间+"', '', '', '"+f.分公司密码+"');";
	var result8=pgdb.query(pg,sql);
	if(result8.状态 !='成功')
	{
		p.状态='执行失败';
		return p;
	}
	
	
/*创建市级代理分公司下单*/
	p.状态 = "成功";
	p.订单id = f.商户订单号;
	p.订单名称 = '加入市级代理分公司';
	p.应付 = Number(f.总额);
	p.折扣 = 0;
	p.实付 = Number(f.总额);
	p.appid = server.appid;
	p.onlyID = f.onlyID;
	p.prepay_id = 交换数据2.prepay_id;
	p.sign = 交换数据2.sign;
	p.收银台 = server.收银台;
	return common.removenull(p);

}

function lastdate(sql, result, pg) {
	var 状态 = result.状态;
	result = JSON.stringify(result);
	var reg = new RegExp("{p.状态}", "g");
	var stringObj = sql;
	stringObj = stringObj.replace(reg, 状态);
	reg = new RegExp("{p.内容}", "g");
	sql = stringObj.replace(reg, result);
	pgdb.query(pg, sql);
	return;
}
						