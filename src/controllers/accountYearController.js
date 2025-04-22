const AccountYear = require('../models/accountYearModel');
const CreateAccountYearRequest = require('../DataContract/Request/CreateAccountYearRequest');
exports.getPagination = async (req, res) => {
    try {
        let { PageIndex, PageSize, SortCol,SortOrder,SearchString } = req.query;
        page = parseInt(PageIndex) || 1;
        limit = parseInt(PageSize) || 10;
        const skip = (page - 1) * limit;
        let query = {IsDelete:{$ne:1}};
        if (SearchString) {
            query.AccountYear = { $regex: SearchString, $options: 'i' };
        }
        let sortField = SortCol && ["AccountYear", "_id"].includes(SortCol) ? SortCol : "AccountYear";
        let sortOrder = SortOrder && SortOrder.toLowerCase() === "asc" ? 1 : -1;
        const data = await AccountYear.find(query)
        .select({ AccountYear: 1, StartDate: 1, EndDate: 1,_id: 1 })
        .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
            const formattedData = data.map(item => ({
                id: item._id,
                accountyear: item.AccountYear,
                startdate: formatDate(item.StartDate),
                enddate: formatDate(item.EndDate),
            }));
        // Get total count for pagination metadata
        const total = await AccountYear.countDocuments(query);

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
        const { accountYear, startDate, endDate } = req.body;
        const newData = new CreateAccountYearRequest(accountYear, startDate, endDate);
        const existingAccountYear = await AccountYear.findOne({ AccountYear: newData.AccountYear, IsDelete: 0 });
        if (existingAccountYear) {
            return res.status(200).json({ status:-1, message: "Account year already exists" });
        }
      
        if (newData.StartDate) {
            newData.StartDate = new Date(new Date(newData.StartDate).setUTCHours(0, 0, 0, 0));
        }
        if (newData.EndDate) {
            newData.EndDate = new Date(new Date(newData.EndDate).setUTCHours(0, 0, 0, 0));
        }
        const saveData = new AccountYear(newData);
        const result= await saveData.save();
        if(result){
            res.status(200).json({status:1,message:"Account year saved"});
        }
       else{
            res.status(400).json({status:-1,message:"Account year not saved"});
        }   
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
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}