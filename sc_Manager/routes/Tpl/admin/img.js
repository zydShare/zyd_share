﻿var alioss = require('../../../func/alioss.js');
var config = require('../../../func/config.js');
	//config.readfile();
var fs = require('fs');
module.exports.run = function(f,pg,mo){
	console.log(f.data.newpath)
	var variable = config.get('alicloud');
	//var s = img.sleep('./temp/2017041909383143756.jpg');
	var client = alioss.init(variable.阿里云参数1.region,variable.阿里云参数1.accessKeyId,variable.阿里云参数1.accessKeySecret);
	local = f.data.newpath;
	obj = local.split('temp\\')[1];
	var type = obj.split('.')[1]; 
	var data = {};
	if(type != 'jpg' && type != 'png') {
		data.状态 = '图片上传格式只能为jpg或png';
		f._isRander = data;
		return f;
	}
	var ali_result = alioss.put(client,variable.阿里云参数1.bucket,obj,local);
	fs.unlink(local);
	console.log(ali_result);
	f._isRander = ali_result;
	return f;
}
