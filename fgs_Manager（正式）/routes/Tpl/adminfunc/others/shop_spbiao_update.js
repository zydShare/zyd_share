/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var shop_spbiao = require('./shop_spbiao.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = shop_spbiao.json();
	p.表名 = '商_商品表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f, pg, mo) {
	//db = sqlite.connect();
	var sql = '';
	f._json = shop_spbiao.json();
	//更改
	if(f.data.id != '')
		//var sql = "update 商_商品表  set 账号='"+f.data.账号+"',姓名='"+f.data.姓名+"',商品名称='"+f.data.商品名称+"',一级分类='"+f.data.一级分类+"',一级分类id='"+f.data.一级分类id+"',二级分类='"+f.data.二级分类+"',二级分类id='"+f.data.二级分类id+"',三级分类='"+f.data.三级分类+"',三级分类id='"+f.data.三级分类id+"',快递费='"+f.data.快递费+"',发货地址id='"+f.data.发货地址id+"',商品收藏数量='"+f.data.商品收藏数量+"',商品类型='"+f.data.商品类型+"',店铺id='"+f.data.店铺id+"',店铺名='"+f.data.店铺名+"',商品详情id='"+f.data.商品详情id+"',销售量='"+f.data.销售量+"',排序='"+f.data.排序+"',类别='"+f.data.类别+"',状态='"+f.data.状态+"',审核人='"+f.data.审核人+"',审核时间='"+f.data.审核时间+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"'  where id = '"+f.data.id+"'";

		var sql = "update 商_商品表  set 账号='"+f.data.账号+"',姓名='"+f.data.姓名+"',商品名称='"+f.data.商品名称+"',一级分类='"+f.data.一级分类+"',一级分类id='"+f.data.一级分类id+"',二级分类='"+f.data.二级分类+"',二级分类id='"+f.data.二级分类id+"',三级分类='"+f.data.三级分类+"',三级分类id='"+f.data.三级分类id+"',快递费='"+f.data.快递费+"',发货地址id='"+f.data.发货地址id+"',商品收藏数量='"+f.data.商品收藏数量+"',商品类型='"+f.data.商品类型+"',店铺id='"+f.data.店铺id+"',店铺名='"+f.data.店铺名+"',商品详情id='"+f.data.商品详情id+"',销售量='"+f.data.销售量+"',排序='"+f.data.排序+"',类别='"+f.data.类别+"',状态='"+f.data.状态+"',审核人='"+f.data.审核人+"',审核时间='"+f.data.审核时间+"',录入人='"+f.session.user_name+"',录入时间='"+f.date+"',备注='"+f.data.备注+"',缩略图='"+f.data.缩略图+"',内容='"+f.data.内容+"'  where id = '"+f.data.id+"'";
	else if(f.data.id == '')
		var sql = "insert into 商_商品表(账号,姓名,商品名称,类别,商品类型,状态,一级分类,一级分类id,二级分类,二级分类id,三级分类,三级分类id,快递费,店铺id,缩略图,店铺名,内容,排序,录入人,录入时间,备注,发货地址id,商品收藏数量,销售量,商品详情id,审核人,审核时间) values('"+f.data.账号+"','"+f.data.姓名+"','"+f.data.商品名称+"','"+f.data.类别+"','"+f.data.商品类型+"','"+f.data.状态+"','"+f.data.一级分类+"','"+f.data.一级分类id+"','"+f.data.二级分类+"','"+f.data.二级分类id+"','"+f.data.三级分类+"','"+f.data.三级分类id+"','"+f.data.快递费+"','"+f.data.店铺id+"','"+f.data.缩略图+"','"+f.data.店铺名+"','"+f.data.内容+"','"+f.data.排序+"','"+f.session.user_name+"','"+f.date+"','"+f.data.备注+"','"+f.data.发货地址id+"','"+f.data.商品收藏数量+"','"+f.data.销售量+"','"+f.data.商品详情id+"','"+f.data.审核人+"','"+f.data.审核时间+"')"
	  s = pgdb.query(pg, sql);
       if(s.状态 != '成功'){
         f._状态='提交失败'
           return f;
      }	
	//sqlite.close(db);
	return f;
}
