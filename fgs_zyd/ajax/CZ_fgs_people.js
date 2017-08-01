/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：分公司成员记录
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
	if(f.分公司编号 == null || f.分公司编号 == '') 
	{
		f.状态 = '分公司编号不能为空';
	}
	if(f.页数==null || f.页数=="" || f.页数==0)
	{
		f.页数 = "0";
	}
	var 每页条数 = "10"; 
	var 开始条数= f.页数  * 每页条数;
	sql="select 姓名,类别 from 分_分公司成员表 where  分公司id='"+f.分公司编号+"' limit "+每页条数+" offset "+开始条数;
	var result3=pgdb.query(pg,sql);
	if(result3.数据.length == 0)
	{
		f.分公司成员列表='';
		f.分公司成员条数=0;
	}
	else
	{
		f.分公司成员列表=result3.数据;
		f.分公司成员条数=result3.数据.length;
	}


	p.状态='成功';
	p.分公司成员列表 = f.分公司成员列表;
	p.分公司成员条数 = f.分公司成员条数;
	p.页数 = Number(f.页数) + 1;
	return common.removenull(p);
}