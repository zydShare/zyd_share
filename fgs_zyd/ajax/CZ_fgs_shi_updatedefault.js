/**
 * 创建人：唐鹏程
 * 创建时间：2017年6月19日15:01:59
 * 创建内容：修改默认市代理分公司
 */

/*
func=CZ_fgs_shi_updatedefault
onlyID=38acba45-1aab-4be4-9cd8-b2b6712865a1
编号=022225588
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

	//查询    市代理分公司编号是否正常
	sql = "select a.分公司id, a.分公司名称, a.类别 from 分_分公司成员表 a,分_分公司表 b where a.账号 = '" + f.账号 + "' and a.分公司id = '" + f.编号 + "' and a.状态 = '正常' and (b.状态 = '状态' or b.状态 = '临时') and b.类别 = '市代理分公司' and a.分公司id = b.编号";
	result = pgdb.query(pg, sql);
	if (result.数据.length == 0) {
        p.状态 = '数据异常';
        return p;
	}

    f.身份信息 = result.数据[0].类别;

    //查询    是否设置默认分公司
    sql = "select id, 市默认时间 from 分_默认表 where 状态 = '正常' and 唯一id = '" + f.onlyID + "'";
    result = pgdb.query(pg, sql);
    if (result.数据.length == 0) {
        //添加    默认分公司
		sql = "insert into 分_默认表 (唯一id, 市分公司, 状态, 录入人, 录入时间, 市默认时间, 账号 , 姓名) VALUES ('" + f.onlyID + "', '" + f.编号 + "', '正常', '系统', '" + f.时间 + "', '" + f.时间 + "', '" + f.账号 + "', '" + f.姓名 + "')";
		result = pgdb.query(pg, sql);
		if (result.状态 != '成功') {
			p.状态 = '设置默认分公司失败';
        	return p;
		}

        //平台交付数据	添加默认分公司
		var types = ['appid','onlyID','branch_type','branch_no'];
		var r = {};
		r.func = 'p_ins_default_branch';
		r.onlyID = f.onlyID;
		r.appid = server.appid;
		r.branch_type = '市代理分公司';
		r.branch_no = f.编号;
		r.branch_status = '正常';
		r.branch_identity = f.身份信息;
		r.sign = sign.autograph(r, types, server.key);
		var 交换数据 = request.post(server.xiadan, r);
		if (交换数据.状态 != '成功') {
			p.状态 = '交互执行失败';
			return p;
		}
		var 信息 = JSON.parse(交换数据.信息);
		f.数据状态 = 信息.状态;
		if (f.数据状态 != '成功') {
			p.状态 = '交互执行失败';
			return p;
		}
    } else {

        //修改    默认分公司
        sql = "update 分_默认表 set 市分公司 = '" + f.编号 + "', 市默认时间 = '" + f.时间 + "' where 唯一id = '" + f.onlyID + "'";
        result = pgdb.query(pg, sql);
        if (result.状态 != '成功') {
            p.状态 = '修改默认分公司失败';
            return p;
        }

        //平台交付数据	修改默认分公司
        var types = ['appid','onlyID','branch_type','branch_no'];
        var r = {};
        r.func = 'p_up_default_branch';
        r.onlyID = f.onlyID;
        r.appid = server.appid;
        r.branch_type = '市代理分公司';
        r.branch_no = f.编号;
        r.branch_status = '正常';
        r.branch_identity = f.身份信息;
        r.sign = sign.autograph(r, types, server.key);
        var 交换数据 = request.post(server.xiadan, r);
        if (交换数据.状态 != '成功') {
            p.状态 = '交互执行失败';
            return p;
        }
        var 信息 = JSON.parse(交换数据.信息);
        f.数据状态 = 信息.状态;
        if (f.数据状态 != '成功') {
            p.状态 = '交互执行失败';
            return p;
        }
    }

	return common.removenull(p);
}