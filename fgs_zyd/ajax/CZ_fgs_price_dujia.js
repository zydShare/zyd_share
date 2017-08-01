/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：独家代理分公司选择类型


func:CZ_fgs_price_dujia
onlyID=123
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
         f.超级商家=top.会.超级商家;
	}
	
	if(f.超级商家 =='是')
	{
		sql = "select id, 名称, Round(@股数,0) as 股数, Round(@单股金额,0) as 单股金额,类别  from 分_分公司设置表 where 状态 ='显示' and 名称='独家代理分公司'";
		var result2=pgdb.query(pg,sql);
		if(result2.数据.length == 0)
		{
			p.状态='套餐数据不存在';
			return p;
		}
		else
		{
			f.类型id=result2.数据[0].id;
			f.类型名称='超级商家';
			f.类型金额=result2.数据[0].单股金额;
		}
		
	}
	else
	{
		sql = "select id, 名称, Round(@股数,0) as 股数, Round(@单股金额,0) as 单股金额,类别  from 分_分公司设置表 where 状态 ='显示中' and 名称='独家代理分公司'";
		var result=pgdb.query(pg,sql);
		if(result.数据.length == 0)
		{
			p.状态='套餐数据不存在';
			return p;
		}
		else
		{
			f.类型id=result.数据[0].id;
			f.类型名称='普通会员';
			f.类型金额=result.数据[0].单股金额;
		}
	}
	

	p.状态 = "成功";
	p.类型id=f.类型id;
	p.类型名称=f.类型名称;
	p.类型金额=f.类型金额;
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
						