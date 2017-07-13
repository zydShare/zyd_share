﻿/*
 * 仿黄总后台总控接口
 * 用法：在相应后台页面引用此方法，可以判别账号登陆状态，是否有进入权限及生成相应传入页面的数据
 * 流程控制：同步
 * 制作人：龙7
 */
var config = require('../func/config.js');
//config.readfile();
var sqlite = require('../func/sqlite.js');
exports.index = function(f) {
	db = sqlite.connect();

	//第一步：拿到一些初始值
	//f._xhtml = '';//页面定向
	f._variable = config.get('variable'); //可用变量
	f._状态 = '成功'; //页面返值
	f.exc = ''; //导出初始化
	//f._isRander = '';//相应类型
	f._ENV = []; //搜索定向
	f._按钮权限 = []; //页面按钮
	f.page = ''; //分页初始
	f._m = f.func.split('/')[1]; //路由定向
	f._n = f.func.split('/')[2];
	f.dbpath = 'pgdb'; //数据库定向

	//f.session.user_name = '67';
	//f.session.user_pid = 3;

	//第二步：是否存有登陆状态
	if((!f.session.user_name || f.session.user_name == null) && (f._m != 'admin' || f._n == 'main')) {

		f.data = {};
		f._xhtml = 'Tpl/admin/login';
		return f;
	}
	if(!f.session.user_pid) {
		return f;
	}

	//第三步：控制可看页面
	var isPower = false;
	sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
	var power = sqlite.query(db, sql).数据;
	if(power.length == 0) f._xhtml = 'Tpl/admin/login';
	else {
		f._权限 = JSON.parse(power[0].权限);
//		console.log(f._权限);
		for(var key in f._权限) {
			if(f._权限[key]['字段'] == f._n) { //列表页
				if(f._权限[key]['查看'] == '1') {
					if(f._权限[key]['按钮'] != null && f._权限[key]['按钮'] != '') {
						f._按钮权限 = f._权限[key]['按钮'];
					}
					isPower = true;
					break;
				}
			} else if(f._权限[key]['字段'] == f.arg._b_pa && f._权限[key]['按钮'] != null && f._权限[key]['按钮'] != '') { //按钮
				var powerBtn = f._权限[key]['按钮'];
				if(typeof powerBtn == 'string' && f._n == powerBtn || typeof powerBtn == 'string' && f.arg._name == powerBtn) {
					isPower = true;
					f.isPower = true;
					break;
				} else {
					for(var item = 0; item < powerBtn.length; ++item) {
						var powerBtnFunc = powerBtn[item];
						if(f._n == powerBtnFunc) { //弹出新页面的按钮
							isPower = true;
							break;
						} else if(f.arg._name == powerBtnFunc) { //没有页面的按钮
							f.isPower = true;
							isPower = true;
							break;
						}
					}
				}
			}
		}

		if(f._m != 'admin' && !isPower) {
			f._isRander = '<script>alert("无此权限！");window.close();</script>';
		}
	}

	//第四步：搜索功能
	if(f.arg._t == 'seach') {
		if(f.arg['_seach'] == null || f.arg['_seach'] == '') {
			for(var key in f.data) {
				if(f.data[key] == '')
					delete f.data[key];
			}
		} else {
			f.data = JSON.parse(decodeURIComponent(f.arg['_seach']));
		}
		if(f.arg['_seach'] == null || f.arg['_seach'] == '')
			f.arg['_seach'] = encodeURIComponent(JSON.stringify(f.data));
	} else {
		f.data = {};
	}

	sqlite.close(db);
//	console.log(f)
	return f;
}