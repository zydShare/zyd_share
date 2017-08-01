/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：显示分公司会员套餐金额
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
	
	sql = "select Round(@sum(消费账户),2) as 未奖积分,Round(@sum(赠送积分),2) as 赠送积分   from 分_全返套餐表  where 账号 = '" + f.分公司编号 + "' and 类别= '分公司套餐'";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		f.奖励积分 = 0;
		f.未奖积分 = 0;
		f.已返积分 = 0;
	}
	else
	{
		var s=result.数据[0];
		f.奖励积分 = Number(s.赠送积分);
		f.未奖积分 = Number(s.未奖积分);
		f.已返积分 = Number(s.赠送积分) - Number(s.未奖积分);
	}
	
	p.状态='成功';
	p.奖励积分 = f.奖励积分;
	p.未奖积分 = f.未奖积分;
	p.已返积分 = f.已返积分;
	return common.removenull(p);
}