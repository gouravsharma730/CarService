const mongoose = require('mongoose');

const URL = process.env.mongoDBURL;

mongoose.connect(URL);

const db =  mongoose.connection;
db.on('error',()=>console.log('MongoDB connection error.'));
db.on('open',()=>console.log('mongoDB connected.'))


module.exports = db;