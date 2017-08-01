/**
 * 创建人：唐鹏程
 * 创建时间：2017年6月19日11:29:37
 * 创建内容：查询所在的市代理分公司列表
 */

/*
func=CZ_fgs_shi_default
onlyID=38acba45-1aab-4be4-9cd8-b2b6712865a1
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
	p.状态 = '成功';
	body.receive = JSON.parse(body.data);
    var f = body.receive;
	var sql = "";
    var result = "";
    f.时间 = moment().format('YYYY-MM-DD HH:mm:ss');
    f.日期 = moment().format('YYYY-MM-DD');
	var top = share.top(f.onlyID, pg);
    if (top.状态 != '成功') {
        p.状态 = top.状态;
        return p;
    }
    f.账号 = top.会.账号;
    f.姓名 = top.会.昵称;

	if(f.页数 == null || f.页数 == '' || f.页数 == 0) 
	{
		f.页数 = 0;
	}

	var 每页条数 = 10;
	var 开始条数 = f.页数 * 每页条数;

	//查询市代理分公司列表
	sql = "select a.分公司id, a.分公司名称 from 分_分公司成员表 a,分_分公司表 b where a.账号 = '" + f.账号 + "' and a.状态 = '正常' and (b.状态 = '状态' or b.状态 = '临时') and b.类别 = '市代理分公司' and a.分公司id = b.编号 order by a.录入时间 desc limit " + 每页条数 + " offset " + 开始条数;
	result = pgdb.query(pg, sql);
	if (result.数据.length == 0) {
		f.列表 = '';
		f.条数 = 0;
	} else {
		f.列表 = result.数据;
		f.条数 = result.数据.length;
	}

	if (result.数据.length != 0) {
		//查询是否设置默认分公司
		sql = "select 市分公司 from 分_默认表 where 状态 = '正常' and 唯一id = '" + f.onlyID + "'";
		result = pgdb.query(pg, sql);
		if (result.数据.length == 0) {
			f.默认分公司编号 = '';
			f.默认分公司名称 = '';
		} else {
			var fgs = result.数据[0];
			if (fgs.市分公司 == null || fgs.市分公司 == '') {
				f.默认分公司编号 = '';
				f.默认分公司名称 = '';
			} else {
				f.默认分公司编号 = fgs.市分公司;
				//查询默认分公司名称
				sql = "select 分公司名称 from 分_分公司成员表 where 分公司id = '" + f.默认分公司编号 + "'";
				result = pgdb.query(pg, sql);
				f.默认分公司名称 = result.数据[0].分公司名称;
			}
		}
	}

	//查询	说明
	sql = "select 内容 from 分_说明表 where 标题 = '设置奖金分公司' and 状态 = '正常' and 类别 = '显示'";
	result = pgdb.query(pg, sql);
	if (result.数据.length == 0) {
		p.说明 = '无说明'
	} else {
		p.说明 = result.数据[0].内容;
	}
	
	//返出数据
	p.列表 = f.列表;
	p.条数 = f.条数;
	p.页数 = Number(f.页数) + 1;
	p.默认分公司编号 = f.默认分公司编号;
	p.默认分公司名称 = f.默认分公司名称;

	return common.removenull(p);
}