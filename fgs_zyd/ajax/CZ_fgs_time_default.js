/**
 * 创建人：唐鹏程
 * 创建时间：22017年6月20日15:14:13
 * 创建内容：默认分公司时间判断
 */

/*
func=CZ_fgs_time_default
onlyID=38acba45-1aab-4be4-9cd8-b2b6712865a1
编号=022225588
类别=市代理分公司/社区代理分公司
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

    if (f.编号 == '' || f.编号 == null) {
        p.状态 = '编号不能为空';
        return p;
    }

    if (f.类别 == '' || f.类别 == null) {
        p.状态 = '类别不能为空';
        return p;
    }

	//查询    市代理分公司编号是否正常
	sql = "select a.分公司id, a.分公司名称, a.类别 from 分_分公司成员表 a,分_分公司表 b where a.账号 = '" + f.账号 + "' and a.分公司id = '" + f.编号 + "' and a.状态 = '正常' and (b.状态 = '状态' or b.状态 = '临时') and b.类别 = '" + f.类别 + "' and a.分公司id = b.编号";
	result = pgdb.query(pg, sql);
	if (result.数据.length == 0) {
        p.状态 = '数据异常';
        return p;
	}

    //查询    是否设置默认分公司
    sql = "select id, 市默认时间, 社区默认时间 from 分_默认表 where 状态 = '正常' and 唯一id = '" + f.onlyID + "'";
    result = pgdb.query(pg, sql);
    if (result.数据.length != 0) {
        var time = result.数据[0];

        //市
        if (f.类别 == '市代理分公司' && time.市默认时间 != null && time.市默认时间 != '') {
            var num = common.timeSecond(new Date().getTime(),new Date(time.市默认时间).getTime());
            f.天 = Number(num) / 86400;
            f.下次切换时间 = new Date(new Date(time.市默认时间).getTime() + (86400000 * 7));
            f.下次切换时间 = moment(f.下次切换时间).format('YYYY-MM-DD HH:mm:ss');
            if (Number(f.天) < 7) {
                p.状态 = '上次设置时间：' + time.市默认时间.substring(0, 10) + '，下次设置时间：' + f.下次切换时间.substring(0, 10);
                return p;
            }
        }

        //社区
        if (f.类别 == '社区代理分公司' && time.社区默认时间 != null && time.社区默认时间 != '') {
            var num = common.timeSecond(new Date().getTime(),new Date(time.社区默认时间).getTime());
            f.天 = Number(num) / 86400;
            f.下次切换时间 = new Date(new Date(time.社区默认时间).getTime() + (86400000 * 7));
            f.下次切换时间 = moment(f.下次切换时间).format('YYYY-MM-DD HH:mm:ss');
            if (Number(f.天) < 7) {
                p.状态 = '上次设置时间：' + time.社区默认时间.substring(0, 10) + '，下次设置时间：' + f.下次切换时间.substring(0, 10);
                return p;
            }
        }
    }

	return common.removenull(p);
}