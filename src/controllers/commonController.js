const Invoice = require('../models/invoiceModel')
const Customer = require('../models/customerModel')
const CustomerResponse = require('../DataContract/response/CustomerResponse');

exports.getInvoiceNo = async (req, res) => {
    try {
        let data = await Invoice.find({IsDelete:{$ne:1}}).sort({ InvoiceNo: -1 }).limit(1);

        if (data && data.length > 0) {
            let latestInvoiceNo = data[0].InvoiceNo;
            let invoiceNumber = parseInt(latestInvoiceNo.split('_')[1]) + 1;
            return res.status(200).json({ InvoiceNo: `INV_${invoiceNumber.toString().padStart(4, '0')}` });
        } else {
            return res.status(200).json({ InvoiceNo: "INV_0001" });
        }
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getCustomerByUID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Customer.findOne({ UID: id });

        if (!result) {
            res.status(400).json({status:-1,message:"Customer not found"});   
        }

        const formattedData = CustomerResponse.fromEntity(result);
        res.status(200).json(formattedData);
    }
     catch (error) {
        return res.status(500).json({ message: error.message });
    }
};