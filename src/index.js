var MongoClient = require('mongodb').MongoClient;

var url='mongodb://localhost:27017/learning_mongo';

MongoClient.connect(url, (err,db) => {
    console.log("Connected successfully to server");

    db.close();
})
