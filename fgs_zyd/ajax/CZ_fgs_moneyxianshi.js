/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：我的金额显示
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
	}
	if(f.分公司编号 =='' || f.分公司编号 == null || f.分公司编号 == undefined)
	{
		p.状态='分公司编号不能为空';
		return p;
	}
	sql="select id,名称,Round(@总账户,2) as 总账户,Round(@回流账户 ,2) as 回流账户 from 分_分公司表   where 编号='"+f.分公司编号+"' ";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='分公司编号有误';
		return p;
	}
	else
	{
		var a=result.数据[0];
		f.总账户=a.总账户;
		f.回流账户=a.回流账户;
		f.id=a.id;
		f.名称=a.名称;
	}
	
	sql="select Round(@个人提取分红,2) as 个人提取分红 ,状态  from 分_分公司成员表   where 分公司id='"+f.分公司编号+"' and 账号='"+f.账号+"'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='数据有误';
		return p;
	}
	if(result2.数据[0].状态 == '停用')
	{
		p.状态='成员状态异常';
		return p;
	}
	f.个人提取分红=result2.数据[0].个人提取分红;
	f.可提取=Number(f.个人提取分红);
	f.提取整万 = Number(f.可提取);

	p.状态 = "成功";
	p.总账户 = f.总账户;
	p.回流账户 = f.回流账户;
	p.提取整万 = (f.提取整万).toFixed(2);
	p.未取整万 = f.个人提取分红;
	p.分公司名称 = f.名称;
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
						