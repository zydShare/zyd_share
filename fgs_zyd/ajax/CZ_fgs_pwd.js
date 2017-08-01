/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：修改分公司密码
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
	var 说明 = JSON.stringify(f);
	var top = share.top(f.onlyID,pg);
	if (top.状态!="成功")
	{
		p.状态=top.状态;
		return p;
	}
	else
	{
		 f.账号 = top.会.账号;
         f.昵称 = top.会.昵称;
         f.超级商家=top.会.超级商家;
	}
	if(f.编号 == '' || f.编号 == null)
	{
		p.状态 = '分公司编号不能为空';
		return p;
	}
	if(f.原密码 == '' || f.原密码 == null)
	{
		p.状态 = '原密码不能为空';
		return p;
	}
	if(f.分公司密码 == null || f.分公司密码 == '') 
	{
		p.状态 = '分公司密码不能为空';
		return p;
	}
	f.endsql = "insert into 分_日志_非钱表(账号, 时间, ip, 类别, 状态, 内容, 备注,卡号,录入人 )values('" + f.账号 + "', '" + 时间 + "', '" + body.ip + "', '修改分公司密码', '{p.状态}', '', '{p.内容}','','')";
   	pgdb.query(pg, "insert into 分_日志_非钱表(账号, 时间, ip, 类别, 状态, 内容, 备注,卡号,录入人 )values('" + f.账号 + "', '" + 时间 + "', '" + body.ip + "', '', '修改分公司密码', '', '" + 说明 + "','','')");

	sql="select id from 分_分公司表 where 分公司密码='"+f.原密码+"' and 编号='" + f.编号 + "'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='原密码输入错误';
		return p;
	}

	sql = "select id from 分_分公司表  where 账号='" + f.账号 + "' and 编号='" + f.编号 + "'";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='您不是该分公司创始人,无权进行此操作';
		return p;
	}
	
	sql = "update 分_分公司表 set 分公司密码 ='" + f.分公司密码 + "' where 账号 = '" + f.账号 + "' and 编号='" + f.编号 + "'";
	var result2=pgdb.query(pg,sql);
	if(result2.状态 != '成功')
	{
		p.状态='修改密码操作执行失败';
		return p;
	}

	p.状态='修改成功';
	p.修改密码 = f.分公司密码;
	return common.removenull(p);
}