var mongoose = require('mongoose');

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/eugenecanhelp';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
console.log(connection_string);
mongoose.connect('mongodb://' + connection_string);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

console.log('Database Node module is loaded')

module.exports = db;