 /**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：社区附属分公司


onlyID=38acba45-1aab-4be4-9cd8-b2b6712865a1
分公司编号=0468456
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
	
	
	sql = "select 市,区 from 分_分公司表 where 编号='"+f.分公司编号+"'";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		f.附属市='';
		f.附属区='';
		
	}
	else
	{
		f.附属市=result.数据[0].市;
		f.附属区=result.数据[0].区;
	}
	
	if(f.页数 == null || f.页数 == "" || f.页数 == 0) 
	{
		f.页数 = 0;
	}
	var 每页条数 = 10;
	var 开始条数 = f.页数 * 每页条数;
	
	var sql="select 编号,名称 from 分_分公司表 where 市='"+f.附属市+"' and 类别='社区代理分公司' order by 录入时间 desc  limit " + 每页条数 + " offset " + 开始条数;
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		f.附属社区分公司='';
		f.附属社区分公司条数=0;
	}
	else
	{
		f.附属社区分公司=result2.数据;
		f.附属社区分公司条数=result2.数据.length;
	}

	p.状态='成功';
	p.附属社区分公司=f.附属社区分公司;
	p.附属社区分公司条数=f.附属社区分公司条数;
	p.页数 = Number(f.页数) + 1;
	return common.removenull(p);
}