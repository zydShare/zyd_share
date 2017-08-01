/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：根据账户获取昵称
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
	var data = {};
	p.状态 = "成功";
	body.receive = JSON.parse(body.data);
	var f = body.receive;
	var sql = "";
	var 时间 = moment().format('YYYY-MM-DD HH:mm:ss');
	var 日期 = moment().format('YYYY-MM-DD');
	var top = share.top(f.onlyID, pg);
	if(top.状态 != "成功") {
		p.状态 = top.状态;
		return p;
	} else {
		f.账号2 = top.会.账号;
		if(f.账号 == f.账号2) {
			p.状态 = '服务商不能是本人';
			return p;
		}
	}
	if(f.账号 == '' || f.账号 == null || f.账号 == undefined) {
		p.状态 = '请输入服务商账号';
		return p;
	}

	//平台交付数据(跨平台下单)
	var types = ['appid', 'account'];
	var r = {};
	r.func = 'p_sel_compellation';
	r.appid = server.appid;
	r.account = f.账号;
	r.sign = sign.autograph(r, types, server.key);
	var reurna = request.post(server.xiadan, r);
	if(reurna.状态 != "成功") {
		p.状态 = "服务商账号输入错误";
		return p;
	} else {
		if(reurna.状态 == '成功') {
			var aa = JSON.parse(reurna.信息);
			if(aa.状态 == '成功') {
				data.DEP = aa;
				var f = data.DEP;
			} else {
				data.状态 = aa.状态;
				return data;
			}

		} else {
			p.状态 = '服务商账号输入错误';
			return p;
		}
	}

	sql = "select id from 分_分公司成员表  where 账号='" + f.账号 + "'";
	var result = pgdb.query(pg, sql);
	if(result.数据.length == 0) {
		p.状态 = '服务商必须是分公司的股东身份';
		return p;
	}

	/*创建市级代理分公司下单*/
	p.状态 = "成功";
	p.姓名 = f.昵称;
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