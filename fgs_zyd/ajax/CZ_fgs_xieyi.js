/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：创建市级代理分公司
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
	
	if(f.类型=='' || f.类型==null || f.类型==undefined)
	{
		p.状态='请输入类型';
		return p;
	}
	
	sql="select id, 标题,内容    from 分_说明表  where 类别='"+f.类型+"'"
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='数据不存在,类别有误';
		return p;
	}
	f.标题=result.数据[0].标题;
	f.内容=result.数据[0].内容;
	

	p.状态 = "成功";
	p.标题=f.标题;
	p.内容=f.内容;
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
						