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

module.exports.run = function(body, pg, mo) {
	var server = config.get('server');
	var p = {};
	p.状态 = "成功";
	body.receive = JSON.parse(body.data);
//	console.log(body.receive)
	var f = body.arg;
	var sql = "";

	var 时间 = moment().format('YYYY-MM-DD HH:mm:ss');
	var 日期 = moment().format('YYYY-MM-DD');

	var top = share.top(f.onlyID, pg);
	if(top.状态 != "成功") {
		p.状态 = top.状态;
		return p;
	} else {
		f.账号 = top.会.账号;
	}
	//	SELECT A.*,B.*,C.* FROM A JOIN B ON B.AID=A.AID JOIN C ON C.AID=A.AID;
	//	sql = "select 名称 from 分_分公司表  where 编号='"+f.分公司编号+"' and 类别='市代理分公司'";

	sql = "select a.账号,a.名称,a.编号,a.省,a.市,a.区,a.类别  from 分_分公司表  a left join 分_分公司申请表  b on a.编号 = b.编号  left join 分_分公司成员表  c on a.编号 = c.分公司id where  a.账号='" + f.账号 + "' and a.类别='市代理分公司'";
	var result = pgdb.query(pg, sql);
	f.列表 = result.数据;
	f.条数 = result.数据.length;

	if(result.数据.length == 0) {
		p.状态 = '该账号未创建或加入分公司';
		return p;
	} else {
		f.列表 = result.数据;
	}

	p.状态 = '成功';
	p.列表 = f.列表;
	p.条数 = f.条数
	console.log(p.列表[0].账号)
	return common.removenull(p);
}