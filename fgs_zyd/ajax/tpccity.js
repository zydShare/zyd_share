var pgdb = require('../func/pgdb.js');
var fs = require('fs');
var moment = require("moment");

module.exports.run = function (body, pg, mo) {


    var sql = "select a.id,a.省份,b.城市,b.区号,b.类别,b.省id from 分_省份表 a,分_市级表_copy b where a.id = b.省id and b.类别 != '县级市' order by b.省id,b.区号,b.类别";
    var result = pgdb.query(pg, sql);

    var str = "[";
    var city = result.数据;
    for (var i = 0; i < city.length; i++) {
        if (city[i].类别 == "省") {
            str += "{";
            str += "'name': '" + city[i].城市 + "',";
            str += "'sub': ["; 
        }
        if (city[i].类别 == "地级市") {
            if (city[i+1] != null && city[i+1].区号 != 0) {
                str += "{'name': '" + city[i].城市 + "','quhao': '" + city[i].区号 + "'},";
            } else {
                str += "{'name': '" + city[i].城市 + "','quhao': '" + city[i].区号 + "'}";
                str += "]";
                if (city[i+1] == null || city[i+1].区号 != 0) {
                    str += "}";
                } else {
                    str += "},";
                } 
            }
        }
    }

    str += "]";
    fs.writeFile('input.txt', str,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
    });

}