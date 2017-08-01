/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：创建社区代理分公司管理分公司栏目接口
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
	if(f.城市 == '' || f.城市 == null)
	{
		p.状态='请选择城市';
		return p;
	}
	if(f.分公司类型 == '' || f.分公司类型 == null)
	{
		p.状态='请输入分公司类型';
		return p;
	}
	
	if(f.分公司类型 == '社区代理分公司') 
	{
		f.类型 = '市代理分公司';
	}
	else if(f.分公司类型 == '市代理分公司')
	{
		f.类型 = '省代理分公司';
	}
	else if(f.分公司类型 == '省代理分公司')
	{
		p.状态 = '分公司类型异常';
		return p;
	}
	
	
	if(f.页数 == null || f.页数 == "" || f.页数 == 0) 
	{
		f.页数 = 0;
	}
	var 每页条数 = 10;
	var 开始条数 = f.页数 * 每页条数;
	sql = "select id, 名称,编号 from 分_分公司表  where 市='" + f.城市 + "' and 类别 ='" + f.类型 + "' and  录入时间 >= '2017-01-01 00:00:00'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		f.列表 = '';
		f.条数 = 0;
	}
	else
	{
		f.列表 = result2.数据;
		f.条数 = result2.数据.length;
	}
	
/*创建市级代理分公司下单*/
	p.状态 = "成功";
	p.列表 = f.列表;
	p.条数 = f.条数;
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
						