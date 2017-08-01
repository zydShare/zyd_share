/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：分公司提取积分
 */

/**
 * 更新人：唐鹏程
 * 更新时间：2017年7月7日13:48:58
 * 更新内容：回调支付密码
 */

/**
 * 更新人：唐鹏程
 * 更新时间：2017年7月13日10:08:41
 * 更新内容：密码输入限制5次
 */

/**
 * 更新人：唐鹏程
 * 更新时间：2017年7月24日15:32:37
 * 更新内容：修改：商城消费券提取接口	添加金额不同执行：外部平台统一减钱接口
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
	f.时间=时间;
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
	}
	if(f.积分 == null || f.积分 == '') 
	{
		p.状态 = '积分不能为空';
		return p;
	}
	if(f.积分 == null || f.积分 == '') 
	{
		p.状态 = '积分不能为空';
		return p;
	}
	if(f.积分 <= 0)
	{
		p.状态 = '输入金额异常';
		return p;
	}
	if(f.积分 % 100 > 0)
	{
		p.状态 = '积分输入必须整百';
		return p;
	}	
	if(f.密码 == null || f.密码 == '') 
	{
		p.状态 = '密码不能为空';
		return p;
	}
	f.endsql = "insert into 分_日志_非钱表(账号, 时间, ip, 类别, 状态, 内容, 备注,卡号,录入人 )values('" + f.账号 + "', '" + f.时间 + "', '" + body.ip + "', '分公司提取积分', '{p.状态}', '', '{p.内容}','','')";
   	pgdb.query(pg, "insert into 分_日志_非钱表(账号, 时间, ip, 类别, 状态, 内容, 备注,卡号,录入人 )values('" + f.账号 + "', '" + f.时间 + "', '" + body.ip + "', '', '分公司提取积分', '', '" + 说明 + "','','')");

/*业务处理模块*/	
	sql="select id,名称,Round(@总账户,2) as 总账户,Round(@回流账户 ,2) as 回流账户 from 分_分公司表   where 编号='"+f.分公司编号+"' ";
	var result=pgdb.query(pg,sql);
	if(result.数据.length == 0)
	{
		p.状态='分公司编号有误';
		return p;
	}
	else
	{
		var a=result.数据[0];
		f.总账户=a.总账户;
		f.回流账户=a.回流账户;
		f.id=a.id;
		f.名称=a.名称;
	}
	
	sql="select Round(@个人提取分红,2) as 个人提取分红 ,状态  from 分_分公司成员表   where 分公司id='"+f.分公司编号+"' and 账号='"+f.账号+"'";
	var result2=pgdb.query(pg,sql);
	if(result2.数据.length == 0)
	{
		p.状态='数据有误';
		return p;
	}
	if(result2.数据[0].状态 == '停用')
	{
		p.状态='成员状态异常';
		return p;
	}
	f.个人提取分红=result2.数据[0].个人提取分红;
	f.可提取=parseInt(Number(f.个人提取分红)/100);
	f.提取整万 = Number(f.可提取) * 100;
	
	if(Number(f.提取整万) < f.积分)
	{
		p.状态="可提取积分不足";
		return p;
	}
	else
	{
		var aa=Number(f.个人提取分红) - Number(f.积分);
		f.余额=aa;	
	}

	//平台交付数据(跨平台验证支付密码)
	var type = ['appid','onlyID','pay_pwd'];
	var r = {};
	r.func = 'p_check_pwd';
	r.appid = server.appid;
	r.onlyID = f.onlyID;
	r.pay_pwd = f.密码;
	r.sign = sign.autograph(r, type, server.key);
	var 交换数据 = request.post(server.xiadan, r);
	if (交换数据.状态 != "成功") {
		p.状态 = "请求数据异常！";
		return p;
	}
	var 信息 = JSON.parse(交换数据.信息);	

	f.file = './_logs/ImmediateTQ/' + 日期 + '/' + f.账号 + '-' + f.分公司编号 + '.txt';
	
	if (信息.状态 != "suc" + server.appid + "001"){
		//创建目录
		if (!fs.existsSync('./_logs/ImmediateTQ')) {
            fs.mkdirSync('./_logs/ImmediateTQ');
        }
		if (!fs.existsSync('_logs/ImmediateTQ/' + 日期)) {
            fs.mkdirSync('_logs/ImmediateTQ/' + 日期);
        }
		//第一次密码错误
		if (!fs.existsSync(f.file)) {
            fs.writeFileSync(f.file,1);
			p.状态 = "支付密码错误，您还有4次机会";
			return p;
        }

		//读取错误次数
		var num = fs.readFileSync(f.file,'utf-8');
		if (Number(num) >= 4) {//第五次错误
			p.状态 = '您当日密码错误次数超过5次，今日不可进行此操作';
			if (Number(num) <= 4) {
				fs.writeFileSync(f.file,Number(num) + 1);
			}
			return p;
		} else {
			fs.writeFileSync(f.file,Number(num) + 1);
			p.状态 = '支付密码错误，您还有' + (4-Number(num)) + '次机会';
			return p;
		}

	} else {
		//读取错误次数
		if (fs.existsSync(f.file)) {
            f.错误次数 = fs.readFileSync(f.file,'utf-8');
        }

		//超过五次
		if (Number(f.错误次数) >= 5) {
			p.状态 = '您当日密码错误次数超过5次，今日不可进行此操作';
			return p;
		} 

		//输入对删除该文件
		if (fs.existsSync(f.file)) {
            fs.unlinkSync(f.file);
        }

	}

	console.log(Number(f.积分)+"==================================================");

/*-----------------------------*/
	sql = "select nextval('分_账户表_id_seq') as 自增_id";
    result = pgdb.query(pg, sql);
    f.平台数据ID = result.数据[0].自增_id;

	//平台交付数据    提取到红利账户
    var types = ['onlyIdVip', 'appid', 'accountType', 'money', 'relevance_id'];
    var r = [];
    r.func = 'p_volume_extract';
    r.appid = server.appid;
    r.money = Number(f.积分);
    r.relevance_id = server.appid + '_CZ_fgs_bonusTimer_' + f.平台数据ID + '_1';
    r.onlyIdVip = f.onlyID;
    r.contentSay = '分公司提取积分';
    r.accountType = '红利账户';
    r.sign = sign.autograph(r, types, server.key);
    var 交换数据 = request.post(server.xiadan, r);
    if (交换数据.状态 != '成功') {
        logs.write('fgs', '分公司立即提取到' + f.账号 +'红利账户失败_' + 交换数据.信息);
		p.状态 = "数据异常!";
        return p;
    }
    var 信息 = JSON.parse(交换数据.信息);
    if (信息.状态 != '成功') {
        logs.write('fgs', '分公司立即提取到' + f.账号 +'红利账户失败_' + 信息.状态);
		p.状态 = "提取积分执行失败!";
        return p;
    }
    //判断金额是否相同  不同执行：减钱接口
    if (Number(信息.金额) !=  Number(f.积分)) {
        //平台交付数据    扣除相应的金额
        var types = ['appid', 'onlyID', 'money', 'relevance_id'];
        var r = [];
        r.func = 'p_Subtract_money';
        r.appid = server.appid;
        r.onlyID = f.onlyID;
        r.money = Number(f.积分);
        r.relevance_id = server.appid + '_CZ_fgs_bonusTimer_' + f.平台数据ID + '_2';
        r.deal_account = '红利账户';
        r.pay_detail = server.fgszf;
        r.explain = '分公司提取积分异常'
        r.sign = sign.autograph(r, types, server.key);
        var 交换数据 = request.post(server.xiadan, r);
        if (交换数据.状态 != '成功') {
            logs.write('fgs', '分公司立即提取回滚到' + f.账号 +'红利账户失败_' + 交换数据.信息);
            p.状态 = "数据异常!";
        	return p;
        }
        var 信息 = JSON.parse(交换数据.信息);
        if (信息.状态 != '成功') {
            logs.write('fgs', '分公司立即提取回滚到' + f.账号 +'红利账户失败_' + 信息.状态);
            p.状态 = "提取积分执行失败!";
        	return p;
        }
		logs.write('fgs', f.账号 +'分公司立即提取回滚!!!');
		p.状态 = "数据异常";
    } else {
		//正常提取
		sql = "update 分_分公司成员表   set 个人提取分红 = '"+f.余额 +"' where 账号 = '" + f.账号 + "' and 分公司id='"+f.分公司编号+"'";
		var result3=pgdb.query(pg,sql);
		if(result3.状态 !='成功')
		{
			p.状态='更新个人提取金额执行失败';
			return p;
		}
		
		sql = "insert into 分_账户表(id,账号,卡号, 姓名, 积分, 余额, 说明, 状态, 类别, 录入人, 录入时间, 备注 )values(" + f.平台数据ID + ",'" + f.账号 + "', '', '" + f.昵称 + "','" + f.积分 + "'," + f.余额 + ", '分公司提取积分', '前台', '奖金', '" + f.昵称 + "', '" + f.时间 + "', '')";
		var result33=pgdb.query(pg,sql);
		if(result33.状态 !='成功')
		{
			p.状态='插入分公司分红记录执行失败';
			return p;
		}
		p.状态 = "提取成功";
	}
	
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
						