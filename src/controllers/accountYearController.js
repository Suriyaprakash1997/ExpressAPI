const AccountYear = require('../models/accountYearModel');
exports.getPagination = async (req, res) => {
    try {
        let { PageIndex, PageSize, SorlCol,SortOrder,SearchString } = req.query;
        page = parseInt(PageIndex) || 1;
        limit = parseInt(PageSize) || 10;
        const skip = (page - 1) * limit;
        let query = {IsDelete:{$ne:1}};
        if (SearchString) {
            query.AccountYear = { $regex: SearchString, $options: 'i' };
        }
        let sortField = SorlCol && ["AccountYear", "_id"].includes(SorlCol) ? SorlCol : "AccountYear";
        let sortOrder = SortOrder && SortOrder.toLowerCase() === "asc" ? 1 : -1;
        const data = await AccountYear.find(query)
        .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination metadata
        const total = await AccountYear.countDocuments(query);

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
        const newData = new AccountYear(req.body);
        const existingAccountYear = await AccountYear.findOne({ AccountYear: newData.AccountYear, IsDelete: 0 });
        if (existingAccountYear) {
            return res.status(400).json({ status:-1, Message: "Account year already exists" });
        }
      
        if (newData.StartDate) {
            newData.StartDate = new Date(new Date(newData.StartDate).setUTCHours(0, 0, 0, 0));
        }
        if (newData.EndDate) {
            newData.EndDate = new Date(new Date(newData.EndDate).setUTCHours(0, 0, 0, 0));
        }
        const result= await newData.save();
        res.status(200).json({scrolltatus:result._id,Message:"Account year saved"});
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const existingAccountYear = await AccountYear.findOne({ AccountYear: updatedData.AccountYear, IsDelete: 0 ,_id:{$ne:id}});
        if (existingAccountYear) {
            return res.status(400).json({ status:-1, Message: "Account year already exists" });
        }
        const updatedAccountYear = await AccountYear.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });
        if (!updatedAccountYear) {
            throw new Error("Account year not found");
        }
        res.status(200).json({status:updatedAccountYear._id,Message:"Account year updated"});
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.delete = async (req, res) => {
    try {
        const result = await AccountYear.findByIdAndUpdate(
            req.params.id,
            { IsDelete: 1 },
            { new: true }
        );
        if (!result) {
            throw new Error("Account year  not found");  
        }
        res.status(200).json({status:1, message: "Account year deleted successfully" });
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.get = async (req, res) => {
    try {
        const result= await AccountYear.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
};