const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    CompanyName: String,
    CustomerName:String
});
const CustomerModel = mongoose.model('CustomerModel', customerSchema, 'tblCustomer');

module.exports = CustomerModel;