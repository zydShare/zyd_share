 /**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：我的市级代理分公司列表
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
//		 console.log(f.账号);
	}
	
	if(f.页数 == null || f.页数 == "" || f.页数 == 0) 
	{
		f.页数 = 0;
	}
	var 每页条数 = 10;
	var 开始条数 = f.页数 * 每页条数;
	sql = "select a.名称 as 分公司名称,a.编号 as 分公司id,a.类别 as 类型,Round(b.所占股数) as 所占股数,a.编号,a.省,a.市,b.类别  as 类别 from 分_分公司表 a left join 分_分公司成员表 b on a.编号=b.分公司id where b.账号='"+f.账号+"' and a.类别='市代理分公司' and b.状态='正常' order by a.录入时间 desc  limit " + 每页条数 + " offset " + 开始条数
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		f.分公司列表='';
		f.分公司条数=0;
	}
	else
	{
		f.分公司列表=result.数据;
		f.分公司条数=result.数据.length;
	}

	p.状态='成功';
	p.分公司列表=f.分公司列表;
	p.分公司条数=f.分公司条数;
	p.页数 = Number(f.页数) + 1;
	return common.removenull(p);
}