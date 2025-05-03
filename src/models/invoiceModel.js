const mongoose = require('mongoose');
function generateUID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
}
const invoiceSchema = new mongoose.Schema({
    UID:{ type: String, default: () => generateUID(10), unique: true  },
    InvoiceNo: { type: String, required: true },
    InvoiceDate: { type: Date,required:true },
    AccountYearId: { type: String,default:'' },
    CustomerId: { type: String,default:'' },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date,default:null },
    IsDelete: { type: Number, default: 0 }
   
});

const InvoiceModel = mongoose.model('InvoiceModel', invoiceSchema, 'tblInvoice');

module.exports = InvoiceModel;