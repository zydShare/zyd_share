var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = '192.168.0.200';
 
var insertData = function(db, callback) {  
    //���ӵ��� site
    var collection = db.collection('site');
    //��������
    var data = [{"name":"����̳�","url":"www.runoob.com"},{"name":"���񹤾�","url":"c.runoob.com"}];
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("���ӳɹ���");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});