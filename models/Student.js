// Student Schema
var mongoose = require('mongoose');

var Student = new mongoose.Schema({ 
    firstName:String,
    lastName:String,
    major:String,
    email:String
});

module.exports = mongoose.model('Student', Student);