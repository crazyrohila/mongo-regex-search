// Required packages
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var MONGO_DB = 'MasterDB';            // DB Name.
var MONGO_COLLECTION = 'Project';     // Collection Name.
var LIMIT = 10;                       // Limit result to show.

var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb'),
 Server = mongo.Server,
 Db = mongo.Db;

// MongoDB Credentials to connect.
var server = new Server('localhost', 27017, {auto_reconnect: false});
var db = new Db(MONGO_DB, server);

var mongo_data = [];    // Result of search
var query;              // Search Query
var sid;                // SocketID of connection

// Start node server.
app.listen(3000);

io.on('connection', function(socket) {
  socket.on('submit', function(data) {
    // Close db connection if any opened.
    db.close();
    // Build Regex query
    query = new RegExp(data.query, 'ig');
    // Get SocketID.
    sid = data.sid;
    db.open(function(err, db) {
      if(err) { return console.dir(err); }
      var result = get_proj_result_by_query(db, query);
      io.to(sid).emit('result', result);
    });
  });
});

function get_proj_result_by_query(db, query) {
  db.collection(MONGO_COLLECTION, function(err, col) {
    // "title" is the key we are searching for.
    col.find({"title": { $regex: query } }).limit(LIMIT).toArray(function(err, docs) {
      for (var i = 0; i < docs.length; i++) {
        mongo_data[i] = {
          title: docs[i].title  // Key we are searching for.
        };
      };
    });
  });
return mongo_data;
};

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
