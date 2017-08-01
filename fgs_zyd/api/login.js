/**观众进入直播间观看
谢泊兴
时间：2016/12/13
内容:
func=loginTV
账号=12345678990
随机码=b256b1bc06e2fb57ba856fe2ed823dad
手机ID=123123
手机名称=112312323
手机型号=231123
直播间id=1
*/
var mongo = require('../func/mongo.js');
var pgdb = require('../func/pgdb.js');
var moment = require("moment");
var common = require('../func/common.js');
var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var logs = require('../func/logs.js');
var request = require('../func/request.js');
var txsms = require('../func/txsms.js');
var rongcloud = require('../func/rongcloud.js');
var uuid = require('uuid');
var transliteration = require('transliteration');
var cache = require('memory-cache');

module.exports.run = function(body,pg,mo){
	var data = {};


	data.aa = uuid.v4();

	data.ddd = pgdb.query(pg,"select id from 三_会员表 where 账号 = '13925259807'");

	console.log(data.ddd);



	var xml = "<xml><code>200</code><users><map><entry><string>userId</string><string>jlk456j5</string></entry><entry><string>blockEndTime</string><string>2015-01-11 01:28:20</string></entry></map></users></xml>";
	var s = xml2map.tojson(xml);

	console.log(s.xml.users);


	var d = JSON.stringify(s);


	console.log(d);


	data.xml = s;
	
	return common.removenull(data);
}