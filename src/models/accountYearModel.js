const mongoose = require('mongoose');
// Define User Schema
const accountYearSchema = new mongoose.Schema({
    AccountYear: String,
    StartDate:String,
    EndDate:String,
    IsDelete:Boolean
});

// Create User Model
const AccountYear = mongoose.model('AccountYear', accountYearSchema, 'tblAccountYear');

module.exports = AccountYear;