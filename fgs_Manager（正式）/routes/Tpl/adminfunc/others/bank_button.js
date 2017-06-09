/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	//console.log(f);
	//f = deleteOne(f, pg, mo);
	eval("f = "+f.arg._name+"(f, pg, mo);");	
	return f;
}

/*
 * 对应着前端的批量修改状态
 */
function updateStateAll(f, pg, mo) {
	
	//重定向
	var sql = '';
	sql = "select id from 平_银行信息表  where id in (" + f.arg.id + ") and 状态= '停用'";
	s = pgdb.query(pg,sql);
    var arr = [];
    var str2 = f.arg.id;
    if(JSON.stringify(s.数据) == '[]'){
    	f.str2 = str2;
    	f.str = '';
    }else{
    	s.数据.forEach(function(item,key){
        	arr.push(item.id);
        	str2=str2.replace(item.id,"");
          	if(key== s.数据.length - 1){
            	f.str2 = str2;
          		f.arr = arr;
        	}
      	})
    }
    
    if(f.arr){
	    var str = (f.arr).join(',');
	    f.str2 = (f.str2).replace(/,{2,}/g, ',').replace(/,$/g, '').replace(/^,/g, '');
	    f.str = str;
    }
    
    
    if(f.str == "" && f.str2 != ""){
    	sql = "update 平_银行信息表 set 状态 = '停用' where id in ("+f.str2+")";
    	pgdb.query(pg,sql);
    }else if(f.str2 == "" && f.str != ""){
    	sql = "update 平_银行信息表 set 状态 = '正常' where id in ("+f.str+")";
    	pgdb.query(pg,sql);
    }else{
    	sql = "update 平_银行信息表 set 状态 = '停用' where id in ("+f.str2+")";
    	pgdb.query(pg,sql);
    	sql = "update 平_银行信息表 set 状态 = '正常' where id in ("+f.str+")";
    	pgdb.query(pg,sql);
    }
    
    f._isRander = '提交成功';
	return f;
}
