/**
 * 开发人：秦功科
 * 开发日期：2017年6月22日10:00:54
 * 功能：切换分公司收益类型
 * 
 * 
 * 
func=CZ_fgs_qhType
onlyID=
分公司编号=022111
切换类型=套餐
分公司密码=123456
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
	f.时间 = moment().format('YYYY-MM-DD HH:mm:ss');
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
		 console.log(f.账号);
	}

	if(!f.分公司编号)
	{
			p.状态 = '分公司编号不能为空';
			return p;
	}
	if(!f.切换类型)
	{
			p.状态 = '请选择您需切换的奖励方式';
			return p;
	}
	if(!f.分公司密码)
	{
			p.状态 = '请您输入分公司密码';
			return p;
	}


	var sql = "select id from 分_分公司成员表 where 账号='"+f.账号+"' and 分公司id='"+f.分公司编号+"' and 类别='创始人' limit 1";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='您不是创始人,不能进行此操作';
		return p;
	}
	
	f.分公司密码2=cipher.md5(f.分公司密码);
	sql = "select id from 分_分公司表 where 分公司密码='"+f.分公司密码2+"'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='分公司密码有误';
		return p;
	}

	sql = "select 切换时间,录入时间 from 分_分公司表 where 编号='"+f.分公司编号+"'";
	var result2=pgdb.query(pg,sql);
	var a=result2.数据[0];
	if(result2.数据.length == 0)
	{
		p.状态='分公司数据有误';
		return p;
	}
//	f.切换时间=a.切换时间;
//	f.上次切换时间 =(cipher.Newtimes(f.切换时间,30)).substring(0,10) + " 00:00:00";
//	if(a.录入时间 == a.切换时间)
//	{
//		sql="update 分_分公司表 set 类型切换='"+f.切换类型+"',切换时间='"+f.时间+"' where 账号='"+f.账号+"' and 编号='"+f.分公司编号+"'";
//		var result22=pgdb.query(pg,sql);
//		if(result22.状态 != '成功')
//		{
//			p.状态='执行失败';
//			return p;
//		}
//	}
//	if(f.上次切换时间 > f.时间)
//	{
//		f.上次提交时间=(f.切换时间).substring(0,10);
//		f.下次提交时间=(f.上次切换时间).substring(0,10);
//		p.状态 = '您在'+f.上次提交时间+'已进行了修改,'+f.下次提交时间+'后方可进行修改';
//		return p;
//	}

	sql="update 分_分公司表 set 类型切换='"+f.切换类型+"',切换时间='"+f.时间+"' where 账号='"+f.账号+"' and 编号='"+f.分公司编号+"'";
	var result33=pgdb.query(pg,sql);
	if(result33.状态 !='成功')
	{
		p.状态='执行失败';
		return p;
	}
	
		p.状态='成功';
		return common.removenull(p);
}
