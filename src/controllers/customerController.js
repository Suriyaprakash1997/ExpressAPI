const Customer=require('../models/customerModel')
exports.getPagination = async (req, res) => {
    try {
        let { PageIndex, PageSize, SorlCol,SortOrder,SearchString } = req.query;
        page = parseInt(PageIndex) || 1;
        limit = parseInt(PageSize) || 10;
        const skip = (page - 1) * limit;
        let query = {};
        if (SearchString) {
            query.CompanyName = { $regex: SearchString, $options: 'i' }; 
            query.CustomerName = { $regex: SearchString, $options: 'i' };
        }
        let sortField = SorlCol && ["CustomerName", "CompanyName"].includes(SorlCol) ? SorlCol : "CustomerName";
        let sortOrder = SortOrder && SortOrder.toLowerCase() === "asc" ? 1 : -1;
        const data = await Customer.find(query)
        .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination metadata
        const total = await Customer.countDocuments(query);

        res.json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: data
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const newData = new Customer(req.body);
        const result= await newData.save();
        res.status(200).json({Status:result._id,Message:"Customer saved"});
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result= await Customer.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });
        if (!result) {
            throw new Error("Customer not found");     
        }
        res.status(200).json({Status:result._id,Message:"Customer updated"});
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.delete = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.get = async (req, res) => {
    try {
        const result= await Customer.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
};