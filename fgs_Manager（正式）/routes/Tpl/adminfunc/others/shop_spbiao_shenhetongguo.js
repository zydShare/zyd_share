/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
//单条显示
//select id,类别名称,排序,图标,状态,录入人,录入时间,备注  from 商_商品类别表
module.exports.run = function(f, pg, mo) {
	var p = {};
	var  sqla='';
	f = control.index(f);
	f._json = this.json();
	var sql = "select *  from 商_商品表 where id='"+f.arg.id+"'";
	f.b=pgdb.query(pg, sql);
	f.r = pgdb.query(pg, sql).数据[0];
	var 商品=f.b;
	var shopshuju=商品.数据[0];
	var sql = "select id,颜色,尺寸  from 商_属性表 where 商品id='"+shopshuju.id+"'";
	  f.t = pgdb.query(pg, sql);
	 var 商品数据=f.t.数据;
	 var arrayb=[];
	    for(var i=0;i<商品数据.length;i++){
	  	var sql = "select 供货价,市场价,建议零售价  from 商_商品价格表 where 属性id='"+商品数据[i].id+"'";
	    var sqla = pgdb.query(pg, sql);
	    if(sqla.数据.length == 0){
	    	f._isRander = '<script>alert("价格表数据错误！");window.close(); </script>';
	    	 return f;
	    }
	  arrayb.push(sqla.数据[0]);
	  }
	    f.jiage=arrayb;
       
        return f;
}

//update 商_商品价格表 set 供货价='55',市场价='22',建议零售价='323' where 属性id='1179'
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var cipher = require('../../../func/cipher.js');
var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f, pg, mo) {
	//db = sqlite.connect();
	//console.log(f.data.市场价)
	f._json = this.json();
	var sql = '';
if(f.data.市场价==undefined){
	f._状态 = '请添加商品属性或者商品价格表';
	return f;
}
  
	 sql = "select id,状态 from 商_商品表 where id=" + f.data.id;
	var sqlt = pgdb.query(pg, sql);
	f.状态a = sqlt.数据[0].状态;
	f.商品id=sqlt.数据[0].id;
	    if(f.状态a !== '申请中'){
    	f._状态 = '状态不是申请中,不能审核通过！';
    	return f;
    }
    if(f.data.市场价==undefined){
    	var sqle = "update 商_商品表  set 状态='正常',上架状态='是', 审核时间='" + f.date + "',审核人='" + f.session.user_name + "',备注='" + f.data.备注 + "' where id=" + f.data.id;	
		var s = pgdb.query(pg, sqle);
          if(s.状态 != '成功'){
           f._状态='提交失败'
            return f;
          }
	     return f;
    }

		var sql = "select id,颜色,尺寸  from 商_属性表 where 商品id='"+f.商品id+"'";
	    var sqla = pgdb.query(pg, sql);;
	  var 商品数据=sqla.数据;
	  var arrayb=[];
	  for(var i=0;i<商品数据.length;i++){
	  	var sql = "select 供货价,市场价,建议零售价  from 商_商品价格表 where 属性id='"+商品数据[i].id+"'";
	    var sqlm = pgdb.query(pg, sql);
	  arrayb.push(sqlm.数据[0])
	  }
	  
		tt=f.data.市场价;
		if (typeof tt == 'string'){
			if(Number(arrayb[0].供货价)>Number(tt)){
	  			f._状态='供货价不能小于市场价';
		  		return f;
		  	}else{
		  	var sqld = "update 商_商品价格表  set 市场价='"+Number(tt)+"' where 属性id='"+商品数据[0].id+"'";
			pgdb.query(pg, sqld);
		  	}
		}else{
		  for(var i=0;i<arrayb.length;i++){
		  	if(Number(arrayb[i].供货价)>Number(tt[i])){
		  		f._状态='供货价不能小于市场价';
		  		return f;
		  	}else{
		  	var sqld = "update 商_商品价格表  set 市场价='"+tt[i]+"' where 属性id='"+商品数据[i].id+"'";
			pgdb.query(pg, sqld);
		  	}
		  }
		}
		var sqle = "update 商_商品表  set 状态='正常',上架状态='是', 审核时间='" + f.date + "',审核人='" + f.session.user_name + "',备注='" + f.data.备注 + "' where id=" + f.data.id;	
		 pgdb.query(pg, sqle);
	     return f;
}


module.exports.json = function() {
	var json = {
		"名称": "审核通过",
		"模块": "adminfunc",
		"func": "shop_spbiao",
		"页数": "10",
		"表名": "商_商品表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}