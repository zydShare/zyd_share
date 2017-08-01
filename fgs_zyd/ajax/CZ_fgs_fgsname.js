 /**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：根据编号搜索分公司名称
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
	
	
	sql = "select 名称 from 分_分公司表 where 编号='"+f.分公司编号+"' and 类别='市代理分公司'";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='请输入正确的市分公司编号';
		return p;
	}
	else
	{
		f.分公司名称=result.数据[0].名称;
	}

	p.状态='成功';
	p.分公司名称=f.分公司名称;
	return common.removenull(p);
}