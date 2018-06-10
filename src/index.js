var MongoClient = require('mongodb').MongoClient;

var url='mongodb://localhost:27017/learning_mongo';

var findDocuments = (db, callback) => {
    var collection = db.collection('tours');

    collection.find().toArray((err, docs) => {
        console.log(docs);
        callback;
    })
}

MongoClient.connect(url, (err,db) => {
    console.log("Connected successfully to server");
    findDocuments(db, () => {
        db.close();
    })
})
