/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：创建市级代理分公司
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


module.exports.run = function (body, pg, mo) {
    var server = config.get('server');
    var p = {};
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
	if(f.选择省份 == null || f.选择省份 == '') 
	{
		p.状态 = '请您选择省份';
		return p;
	} 
	if(f.选择城市 == null || f.选择城市 == '')
	{
		p.状态 = '请您选择城市';
		return p;
	}
	if(f.推荐人手机号 == null || f.推荐人手机号 == '') 
	{
		p.状态 = '请您填写服务商的账号';
		return p;
	}
	if(f.推荐人手机号 == f.账号) 
	{
		p.状态 = '服务商不能是本人';
		return p;
	}
	if(f.推荐人姓名 == null || f.推荐人姓名 == '') 
	{
		p.状态 = '请您填写服务商姓名';
		return p;
	}
	if(f.分公司编号 == null || f.分公司编号 == '') 
	{
		p.状态 = '请填写分公司编号';
		return p;
	}
	if(f.分公司名称 == null || f.分公司名称 == '') 
	{
		p.状态 = '请填写分公司名称';
		return p;
	}
	if(f.分公司密码 == null || f.分公司密码 == '') 
	{
		p.状态 = '请填写分公司密码';
		return p;
	}
	if(f.分公司类型 == null || f.分公司类型 == '') 
	{
		p.状态 = '请填写分公司类型';
		return p;
	}
	if(f.分公司类型  != '市代理分公司')
	{
		p.状态 = '该功能只支持创建市代理分公司';
		return p;
	}
	if(f.认购股份 == null || f.认购股份 == '') 
	{
		p.状态 = '请填写认购股份';
		return p;
	}
	if(f.认购股份 <= 0 || f.认购股份 > 10 )
	{	
		p.状态 = '认购股份不能小于1股或者大于10股,请重新输入';
		return p;
	}
	if(f.分公司设置id == null || f.分公司设置id == '')
	{
		p.状态 = '请填写分公司设置id';
		return p;
	}
	
/*业务处理模块*/	

/*辨别分公司编号是否已被使用*/	
	sql = "select id from 分_分公司申请表   where 编号 = '" + f.分公司编号 + "' and 状态 = '已支付' ";
	var result = pgdb.query(pg, sql);
	if(result.数据.length > 0)
	{
		p.状态 = '该分公司编号已存在';
		return p;
	}
	
/*辨别分公司名称是否已被使用*/	
	sql = "select id from 分_分公司申请表  where 名称 = '" + f.分公司名称 + "' and 状态 = '已支付' ";
	var result1 = pgdb.query(pg, sql);
	if(result1.数据.length > 0)
	{
		p.状态 = '该分公司名称已存在';
		return p;
	}

/*作废或者停用的分公司编号已不能再被注册*/
	sql = "select id from 分_分公司表 where 编号 = '" + f.分公司编号 + "' and (状态  = '作废' or 状态  = '停用')";
	var result2 = pgdb.query(pg, sql);
	if(result2.数据.length > 0)
	{
		p.状态 = '分公司编号已被注册';
		return p;
	}

/*作废或者停用的分公司名称已不能再被注册*/
	sql = "select id from 分_分公司表 where 名称 = '" + f.分公司名称 + "' and (状态  = '作废' or 状态  = '停用')";
	var result3=pgdb.query(pg,sql);
	if(result3.数据.length > 0)
	{
		p.状态 = '分公司名称已被注册';
		return p;
	}
	
/*查询分公司套餐的股数和单股金额*/
	sql = "select id,名称,Round(@单股金额,2) as 单股金额,股数,创建数量,每股赠送个数  from 分_分公司设置表  where id = '" + f.分公司设置id + "' and 名称 = '"+f.分公司类型+"'";
	var result4=pgdb.query(pg,sql);
	if(result4.数据.length <= 0)
	{
		p.状态 = '分公司设置id与分公司选择类型不匹配';
		return p;
	}
	else
	{
		f.金额 = Number(result4.数据[0].单股金额) * Number(f.认购股份);
		f.股数 = f.认购股份;
		f.分公司创建数量 = Number(result4.数据[0].创建数量);
		f.每股赠送个数=Number(result4.数据[0].每股赠送个数);
		f.套餐名称=result4.数据[0].名称;
	}
	
/*限制分公司创建数量*/
	sql = "select COUNT(id) as 市id from 分_分公司表 where 市 = '" + f.选择城市 + "' and 类别 ='市代理分公司'";
	var result5=pgdb.query(pg,sql);
	if(result5.数据.length <= 0)
	{
		f.市代理分公司数量='';
	}
	f.市代理分公司数量=result5.数据[0].市id;
	if(result5.数据[0].市id > f.分公司创建数量)
	{
		p.状态 = '该区域的市代理分公司数量已满,请选择其他的市';
		return p;
	}
	
/*判断推荐人是否是分公司股东或者创始人*/
	/*sql = "select id,分公司名称   from 分_分公司成员表 where 账号 = '" + f.推荐人手机号 + "' limit 1";
	var result6=pgdb.query(pg,sql);
	if(result6.数据.length <= 0)
	{
		p.状态 = '服务商不是分公司股东或创始人';
		return p;
	}*/
	
	
/*取出市级的省份id和名称*/
	sql = "select id,名称  from 分_分公司表  where 省='"+f.选择省份+"' and 类别='省代理分公司' limit 1";
	var result7=pgdb.query(pg,sql);
	if(result7.数据.length <= 0)
	{
		f.上级分公司id='0';
		f.上级分公司名称='';
	}
	else
	{
		f.上级分公司id=result7.数据[0].id;
		f.上级分公司名称=result7.数据[0].名称;
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
    r.total_fee = Number(f.金额);
    r.body = '创建市级代理分公司';
    r.sign = sign.autograph(r, types, server.key);
    r.notify_url = server.pay_return_url + "/CZ_fgs_shipay.xhtml";
    r.payment_type = server.fgszf;
    var 交换数据 = request.post(server.xiadan, r);
    if (交换数据.状态 != "成功")
    {
        p.状态 = "创建市级代理分公司下单失败!";
        return p;
    }
    var 信息 = 交换数据.信息;
    var 交换数据2 = JSON.parse(信息);
    f.数据状态 = 交换数据2.状态;
    if (f.数据状态 != "成功") 
    {
        p.状态 = '创建市级代理分公司执行失败';
        return p;
    }
/*-----------------------------*/



/*创建市级代理分公司下单*/
	
	sql = "insert into 分_分公司申请表(账号, 姓名, 名称, 编号, 省, 市,区,商户订单号,上级,上级姓名,分公司设置id,分公司设置名称, 层1分公司名称, 层1分公司id, 层2分公司名称, 层2分公司id, 层3分公司名称, 层3分公司id, 金额, 股数, 支付方式, 支付时间, 支付订单号, 状态, 类别, 录入人, 录入时间, 备注, 分公司密码,每股赠送个数 )values('" + f.账号 + "', '" + f.昵称 + "', '" + f.分公司名称 + "', '" + f.分公司编号 + "', '" + f.选择省份 + "', '" + f.选择城市 + "','"+f.选择区+"','"+f.商户订单号+"','" + f.推荐人手机号 + "','" + f.推荐人姓名 + "', '" + f.分公司设置id + "', '" + f.分公司类型 + "', '" + f.上级分公司名称 + "', " + f.上级分公司id + ", '',0, '',0, " + f.金额 + ", '" + f.股数 + "', '', '', '', '未支付', '创建市代理分公司', '系统', '" + 时间 + "', '', '" + f.分公司密码 + "',"+f.每股赠送个数+")";
	var result8=pgdb.query(pg,sql);
	if(result8.状态  != '成功' )
	{
		p.状态='执行失败';
		return p;
	}
	
	
/*创建市级代理分公司下单*/
	p.状态 = "成功";
	p.订单id = f.商户订单号;
	p.订单名称 = '创建市级代理分公司';
	p.应付 = Number(f.金额);
	p.折扣 = 0;
	p.实付 = Number(f.金额);
	p.appid = server.appid;
	p.onlyID = f.onlyID;
	p.prepay_id = 交换数据2.prepay_id;
	p.sign = 交换数据2.sign;
	p.收银台 = server.收银台;
	p.分公司名称=f.分公司名称;
	p.分公司编号=f.分公司编号;
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
						