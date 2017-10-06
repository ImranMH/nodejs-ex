
//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*local file call*/
var UserModel = require('./server/model/user.model')   
var userRoute = require('./server/routes/user.route')(UserModel)   
Object.assign=require('object-assign')

app.use( express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}



var connectingString = 'mongodb://127.0.0.1:27017/test4'
  mongoose.connect(connectingString,{
    useMongoClient: true,
    /* other options */
  });
if(process.env.MONGODB_PORT) {
  mongoose.connect(mongoURL,{
    useMongoClient: true,
    /* other options */
  });
}
var db = mongoose.connection;



// db.on('connected', function(){  
//     console.log("Mongoose default connection is open to ", mongoURL);
//  });
// db.on('error', function(err){
//      console.log("Mongoose default connection has occured "+err+" error");
// })
// db.on('disconnected', function(){
//      console.log("Mongoose default connection is disconnected");
// });
// process.on('SIGINT', function(){
//     mongoose.connection.close(function(){
//       console.log("Mongoose default connection is disconnected due to application termination");
//        process.exit(0);
//       });
// });





// app.get('/', function (req, res) {
//   // try to initialize the db on every request if it's not already
//   // initialized.
//   res.render('index.html');
// });




app.get('/process', function (req, res) {
  // try to initialize the db on every request if it's not already
  res.json(process.env)
});
// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// initDb(function(err){
//   console.log('Error connecting to Mongo. Message:\n'+err);
// });

app.use('/user', userRoute)

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
