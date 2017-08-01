/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：社区套餐列表获取  选择类型
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
	 //平台交付数据(跨平台下单)
//  var types = ['appid', 'account'];
//  var r = {};
//  r.func = 'p_sel_compellation';
//  r.appid = server.appid;
//  r.account = f.账号;
//  r.sign = sign.autograph(r, types, server.key);
//  var reurna = request.post(server.xiadan, r);
//  if (reurna.状态 != "成功")
//  {
//      p.状态 = "查询超级商家执行失败";
//      return p;
//  }
//  else
//  {
//  	  if(reurna.状态 =='成功')
//  	  {
//  	  	  var aa=JSON.parse(reurna.信息);
//  	  	  if(aa.状态 =='成功')
//  	  	  {
//  	  	  	 data.DEP=aa;
//  	  	  }
//  	  	  else
//  	  	  {
//  	  	  	 data.状态=aa.状态;
//  	  	  	 return data;
//  	  	  }
//  	  	 
//  	  }
//  	  else
//  	  {
//  	  	  p.状态='查询超级商家数据执行失败';
//  	  	  return p;
//  	  }
//  }
	
	if(f.超级商家 =='是')
	{
		sql = "select id, 名称, Round(@股数,0) as 股数, Round(@单股金额,0) as 单股金额,类别  from 分_分公司设置表 where 状态 ='显示' and 名称='社区代理分公司'";
		var result2=pgdb.query(pg,sql);
		if(result2.数据.length == 0)
		{
			p.状态='套餐数据不存在';
			return p;
		}
		else
		{
			f.套餐列表=result2.数据;
			f.套餐条数=result2.数据.length;
		}
		
	}
	else
	{
		sql = "select id, 名称, Round(@股数,0) as 股数, Round(@单股金额,0) as 单股金额,类别  from 分_分公司设置表 where 状态 ='显示中' and 名称='社区代理分公司'";
		var result=pgdb.query(pg,sql);
		if(result.数据.length == 0)
		{
			p.状态='套餐数据不存在';
			return p;
		}
		else
		{
			f.套餐列表=result.数据;
			f.套餐条数=result.数据.length;
		}
	}
	
	
	
/*创建市级代理分公司下单*/
	p.状态 = "成功";
	p.套餐列表=f.套餐列表;
	p.套餐条数=f.套餐条数;
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
						