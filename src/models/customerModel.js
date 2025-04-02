const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    CustomerName: { type: String, required: true },
    CompanyName: { type: String,required:true },
    Address: { type: String,default:'' },
    Phone: { type: String,default:'' },
    Mobile: { type: String,default:'' },
    Email: { type: String,default:'' },
    Web: { type: String,default:'' },
    Skype: { type: String,default:'' },
    Elance: { type: String,default:'' },
    Freelancer: { type: String,default:'' },
    Upwork: { type: String,default:'' },
    Currency: { type: String,default:'' },
    CurrencyCode: { type: String ,default:''},
    Status: { type: Number,default:1 },
    GST: { type: Number,default:0 },
    GSTNumber: { type: String,default:'' },
    CountryCode: { type: Number,default:0 },
    AttentionPerson: { type: String,default:'' },
    AttentionDesignation: { type: String,default:'' },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date,default:null },
    IsDelete: { type: Number, default: 0 }
   
});
const CustomerModel = mongoose.model('CustomerModel', customerSchema, 'tblCustomer');

module.exports = CustomerModel;