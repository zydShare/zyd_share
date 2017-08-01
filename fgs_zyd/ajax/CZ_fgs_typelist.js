/**
 * 开发人：秦功科
 * 开发日期：2017年6月22日10:00:46
 * 功能：分公司类型切换列表
 * 
 * 
账号=13635750336
随机码=21325b72db948a8ba69c43fd0272bf05
分公司编号=022111
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
	sql = "select id,类型切换,切换时间,录入时间  from 分_分公司表 where 编号='"+f.分公司编号+"'";
	console.log(sql);
		var result=pgdb.query(pg,sql);
		var a=result.数据[0];
		if(result.数据.length == 0) 
		{
			p.状态='分公司不存在';
			return p;
		}
		if(a.录入时间 == a.切换时间)
		{
			f.切换时间='';
			f.切换类型=a.类型切换;
		}
		else
		{
			f.切换类型=a.类型切换;
			f.切换时间=(a.切换时间).substring(0,10);
		}
		
		p.状态='成功';
		p.切换类型 = f.切换类型;
		p.切换时间 = f.切换时间;
		return common.removenull(p);
}
