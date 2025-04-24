const Customer=require('../models/customerModel')
const CreateCustomerRequest = require('../DataContract/Request/CreateCustomerRequest');
const CustomerListResponse = require('../DataContract/response/CustomerListResponse');
const CustomerResponse = require('../DataContract/response/CustomerResponse');
const {customerSchema} = require('../validation/customervalidator')
exports.getPagination = async (req, res) => {
    try {
        let { PageIndex, PageSize, SortCol,SortOrder,SearchString } = req.query;
        page = parseInt(PageIndex) || 1;
        limit = parseInt(PageSize) || 10;
        const skip = (page - 1) * limit;
        let query = {IsDelete:{$ne:1}};
        if (SearchString) {
            query.$or = [
                { CompanyName: { $regex: SearchString, $options: 'i' } },
                { CustomerName: { $regex: SearchString, $options: 'i' } }
            ];
        }
        let sortField = SortCol && ["CustomerName", "CompanyName"].includes(SortCol) ? SortCol : "CustomerName";
        let sortOrder = SortOrder && SortOrder.toLowerCase() === "asc" ? 1 : -1;
        const data = await Customer.find(query)
        .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
       const formattedData = data.map(item => CustomerListResponse.fromEntity(item));
        // Get total count for pagination metadata
        const total = await Customer.countDocuments(query);

        res.json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: formattedData
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const { customerName, companyName,address,
            phone, email, mobile, currency, currencyCode, status,
              gST, gSTNumber,countryCode } = req.body;
        const newData = new CreateCustomerRequest(customerName, companyName,address,
            phone, email, mobile, currency, currencyCode, status,
              gST, gSTNumber,countryCode);
              const parseResult = customerSchema.safeParse(newData);
              if (!parseResult.success) {
                return res.status(400).json({
                    status: -1,
                    message: "Validation failed",
                    errors: parseResult.error.flatten()
                });
            }
        const saveData = new Customer(newData);
         const existingData = await Customer.findOne({ CustomerName: newData.customerName, IsDelete: 0 });
                if (existingData) {
                    return res.status(400).json({ Status:-1, Message: "Customer already exists" });
                }
              
        const result= await saveData.save();
        if(result){
            res.status(200).json({status:1,message:"Customer saved"});
        }
        else{
            res.status(400).json({status:-1,message:"Customer not saved"});
        }
       
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerName, companyName,address,
            phone, email, mobile,currency, currencyCode, status,
              gST, gSTNumber,countryCode} = req.body;
              const newData = new CreateCustomerRequest(customerName, companyName,address,
                phone, email, mobile,  currency, currencyCode, status,
                  gST, gSTNumber,countryCode);
                  const parseResult = customerSchema.safeParse(newData);
                  if (!parseResult.success) {
                    return res.status(400).json({
                        status: -1,
                        message: "Validation failed",
                        errors: parseResult.error.flatten()
                    });
                }
        const existingData = await Customer.findOne({ CustomerName: newData.CustomerName, IsDelete: 0,_id:{$ne:id} });
        if (existingData) {
            return res.status(400).json({ Status:-1, Message: "Customer already exists" });
        }
        const result= await Customer.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true
        });
        if (!result) {
            res.status(400).json({status:-1,message:"Customer not found"});   
        }
        res.status(200).json({status:1,Message:"Customer updated"});
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.delete = async (req, res) => {
    try {
        const result = await Customer.findByIdAndUpdate(
            req.params.id,
            { IsDelete: 1 },
            { new: true }
        );
        if (!result) {
            throw new Error("Customer  not found");  
        }
        res.status(200).json({status:1, message: "Customer deleted successfully" });
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.get = async (req, res) => {
    try {
        const result= await Customer.findById(req.params.id);
        if (!result) {
            res.status(400).json({status:-1,message:"Customer not found"});   
        }
        const formattedData = CustomerResponse.fromEntity(result);
        res.status(200).json(formattedData);
    } catch (error) {
        throw new Error(error.message);
    }
};