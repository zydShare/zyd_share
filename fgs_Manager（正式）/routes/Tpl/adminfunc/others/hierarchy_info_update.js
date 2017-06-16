/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = this.json();
	p.表名 = '平_会员表';
	f = share.update(p, f, pg);
	return f;
}

//更改接口
/*
 * 更新：有id值
 */

var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	var sql = '';
	f._json = this.json();
	if(f.data.新推荐人账号 == '' || f.data.新推荐人账号 == null){
		f._状态 = '新推荐人不能为空';
		return f;
	}else if(f.data.新推荐人账号 == f.data.账号){
		f._状态 = '新推荐人不能为自己';
		return f;
	}else if(f.data.新推荐人账号 == f.data.原推荐人账号){
		f._状态 = '新上级不能与原上级一致';
		return f;
	}
	
	sql = "select 层1上级,层1名称 from 平_会员表 where 账号 = '" + f.data.新推荐人账号 + "'";
	s = pgdb.query(pg,sql);
	if(s.数据.length < 0){
		f._状态 = '新上级账号不存在';
		return f;
	}else if(f.data.账号 == s.数据[0].层1上级){
		f._状态 = '新推荐人已是账号的下级,无法更改';
		return f;
	}
	
sql = "insert into 平_日志_非钱表( 卡号, 账号, 时间, ip, 类别, 状态, 内容,备注,录入人)values('', '" + f.data.账号 + "', '" + f.date + "', '" 
	+ f.ip + "', '后台_会员_更改上级', '成功', '原上级：原推荐人账号【"+f.data.原推荐人账号+"】新上级：新推荐人账号【"+f.data.新推荐人账号+"】','"
	+ f.data.备注 + "', '" + f.session.user_name + "')";
//	pgdb.query(pg,sql);
	  s = pgdb.query(pg, sql);
	  if(s.状态 != '成功'){
	    f._状态='提交失败'
	    return f;
	  }
	
	sql = "update 平_会员表  set 层1上级 = '"+f.data.新推荐人账号+"',层1名称 = '"+f.data.新推荐人昵称+"' where 账号 ='"+f.data.账号+"'";
	 s = pgdb.query(pg, sql);
	  if(s.状态 != '成功'){
	    f._状态='提交失败'
	    return f;
	  }
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "更改推荐人",
		"模块": "adminconfunc",
		"func": "hierarchy_info_update",
		"页数": "10",
		"表名": "平_会员表"
	};
	return json;
}

