/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：区级列表获取
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
	if(f.市 == "" || f.市 ==null)
	{
		f.状态 = '请选择市'
	}
	
	
	sql = "select a.名称 from 分_区级表 a left join 分_市级表 b on a.市id=b.id where b.城市='"+f.市+"'";
	var result3=pgdb.query(pg,sql);
	if(result3.数据.length == 0)
	{
		p.状态='数据不存在';
		return p;
	}
	f.区级列表=result3.数据;
	f.条数=result3.数据.length; 

	p.状态 = "成功";
	p.区级列表=f.区级列表;
	p.条数=f.条数;
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
						