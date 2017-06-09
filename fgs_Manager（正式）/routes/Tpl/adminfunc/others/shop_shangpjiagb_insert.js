/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_shangpjiagb= require('./shop_shangpjiagb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_shangpjiagb.json();
	p.表名 = '商_商品价格表';
	f = share.update(p, f, pg);
	//console.log(f);
	return f;
}


/*
 *添加新的商品属性
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f, pg, mo) {
	f._json = shop_shangpjiagb.json();
	//console.log("--名称="+f.data.名称+"--状态="+f.data.状态+"--类别="+f.data.类别+"--银行编码="+f.data.银行编码);
	if(f.data.商品id == "" || f.data.商品id == "null" || f.data.商品id == undefined){
		f._isRander = "请输入商品id!";
		return f;
	}
	if(f.data.供货价 == "" || f.data.供货价 == "null" || f.data.供货价 == undefined){
		f._isRander = "请输入供货价!";
		return f;
	}
	if(f.data.市场价 == "" || f.data.市场价 == "null" || f.data.市场价 == undefined){
		f._isRander = "请输入市场价!";
		return f;
	}
	if(f.data.建议零售价 == "" || f.data.建议零售价 == "null" || f.data.建议零售价 == undefined){
		f._isRander = "请输入建议零售价!";
		return f;
	}
	if(f.data.折扣价 == "" || f.data.折扣价 == "null" || f.data.折扣价 == undefined){
		f._isRander = "请输入折扣价!";
		return f;
	}
	if(f.data.属性id == "" || f.data.属性id == "null" || f.data.属性id == undefined){
		f._isRander = "请输入属性id!";
		return f;
	}
	if(f.data.状态 == "" || f.data.状态 == "null" || f.data.状态 == undefined){
		f._isRander = "请输入状态!";
		return f;
	}

	
	var sql = "insert into 商_商品价格表(商品id,供货价,市场价,建议零售价,折扣价,属性id,状态,录入人,录入时间,备注) values('"+f.data.商品id+"','"+f.data.供货价+"','"+f.data.市场价+"','"+f.data.建议零售价+"','"+f.data.折扣价+"','"+f.data.属性id+"','"+f.data.状态+"','"+f.session.user_name+"','"+f.date+"','"+f.data.备注+"')"
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }
	return f;
}