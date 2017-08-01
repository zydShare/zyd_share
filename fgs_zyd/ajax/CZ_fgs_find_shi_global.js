/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：加入市级代理分公司选择类型
 */

var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var share = require('../api/public/share.js');
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
         f.超级商家=top.会.超级商家;
	}
	
	
	sql = "select a.id,a.名称,a.编号,a.类别,b.单股金额 from 分_分公司表 a,分_分公司设置表 b where 编号 ='" + f.分公司编号 + "' and a.类别 = b.名称 and b.状态 ='显示' and b.名称='市代理分公司'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='分公司编号有误';
		return p;
	}
	else
	{
		f.类别=result2.数据[0].类别;
	}

	if(f.超级商家 == '是')
	{
		sql = "select id,名称,Round(单股金额,0) as 单股金额,类别 from 分_分公司设置表 where 名称 = '"+f.类别+"' and 状态='显示'";
		var result3=pgdb.query(pg,sql);
		if(result3.数据.length == 0)
		{
			p.状态='数据异常';
			return p;
		}
		else
		{
			f.套餐列表=result3.数据;
			f.套餐条数=result3.数据.length;
		}
		
	}
	else
	{
		sql = "select id,名称,Round(单股金额,0) as 单股金额,类别 from 分_分公司设置表 where 名称 = '"+f.类别+"' and 状态='显示中'";
		var result3=pgdb.query(pg,sql);
		if(result3.数据.length == 0)
		{
			p.状态='数据异常';
			return p;
		}
		else
		{
			f.套餐列表=result3.数据;
			f.套餐条数=result3.数据.length;
		}
	}



	p.状态='成功';
	p.套餐列表=f.套餐列表;
	p.套餐条数=f.套餐条数;
	return common.removenull(p);
}