var MongoClient = require('mongodb').MongoClient,
    Hapi = require('hapi');

var url = 'mongodb://localhost:27017/learning_mongo';

var server = new Hapi.Server();
server.connection({
    port: 8080
})

server.route([
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        config: { json: { space: 2 } },
        handler: (request, reply) => {
            var findObject = {};
            for (var key in request.query) {
                findObject[key] = request.query[key];
            }
            collection.find().toArray((error, tours) => {
                reply(tours);
            })
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: (request, reply) => {
            collection.insertOne(request.payload, (error, result) => {
                reply(request.payload);
            })
            // reply ("Adding new tour");
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            collection.findOne({ "tourName": request.params.name }, (error, tour) => {
                reply(tour);
            })
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            if (request.query.replace == "true") {
                request.payload.tourName = request.params.name;
                collection.replaceOne({ "tourName": request.params.name }, request.payload, (error, results) => {
                    collection.findOne({ "tourName": request.params.name }, (error, results) => {
                        reply(results);
                    })
                })
            } else {
                collection.updateOne({ tourName: request.params.name },
                    { $set: request.payload }, (error, results) => {
                        collection.findOne({ "tourName": request.params.name }, (error, results) => {
                            reply(results);
                        })
                    })
            }

        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            collection.deleteOne({ tourName: request.params.name }, (error, results) => {
                reply().code(204);
            })
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply("Hello world from Hapi/Mongo example")
        }
    }
])


MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to server");
    collection = db.collection('tours');
    server.start((err) => {
        console.log('Hopi is listening to http://localhost:8080');
    })
})
