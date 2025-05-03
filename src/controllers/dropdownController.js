const Customer = require('../models/customerModel')
const Project = require('../models/projectModel')


exports.get = async (req, res) => {
    try {
        let result = null;
        let { mode, id } = req.query;

        if (mode == 'customer') {
            result = await Customer.find({}, { CustomerName: 1, UID: 1, _id: 0 });
        } 
        else if (mode == 'project') {
            result = await Project.find({ CustomerId: { $eq: id } }, { ProjectName: 1, UID: 1, _id: 0 });
        }

        if (result && result.length > 0) {
            return res.status(200).json(result);
        } 
        else {
            return res.status(404).json({ message: "No records found" });
        }

    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


