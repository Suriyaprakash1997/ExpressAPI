const Project=require('../models/projectModel')
exports.getPagination = async (req, res) => {
    try {
        let { PageIndex, PageSize, SorlCol,SortOrder,SearchString } = req.query;
        page = parseInt(PageIndex) || 1;
        limit = parseInt(PageSize) || 10;
        const skip = (page - 1) * limit;
        let query = {IsDelete:{$ne:1}};
        if (SearchString) {
            query.ProjectName = { $regex: SearchString, $options: 'i' }; 
        }
        let sortField = SorlCol && ["ProjectName"].includes(SorlCol) ? SorlCol : "ProjectName";
        let sortOrder = SortOrder && SortOrder.toLowerCase() === "asc" ? 1 : -1;
        const data = await Project.find(query)
        .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination metadata
        const total = await Project.countDocuments(query);

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
        const newData = new Project(req.body);
        const result= await newData.save();
        res.status(200).json({Status:result._id,Message:"Project details saved"});
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result= await Project.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });
        if (!result) {
            throw new Error("Project not found");     
        }
        res.status(200).json({Status:result._id,Message:"Project details updated"});
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { IsDelete: 1 },
            { new: true }
        );

        if (!project) {
            throw new Error("Project not found");  
        }

        res.status(200).json({status:project._id, message: "Project detail deleted successfully"});
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.get = async (req, res) => {
    try {
        const result= await Project.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        throw new Error(error.message);
    }
};