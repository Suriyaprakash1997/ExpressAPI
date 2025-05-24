const mongoose = require('mongoose');
function generateUID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
}
const employeeSchema = new mongoose.Schema({
    UID:{ type: String, default: () => generateUID(10), unique: true  },
    EmployeeCode: { type: String, required: true },
    EmployeeName: { type: String, required:true },
    DateOfBirth: { type: Date, required: true },
    DateOfJoin: { type: Date, required: true },
    EmailID: { type: String, required: true  },
    Salary: { type: Number, required: true  },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date,default:null },
    IsDelete: { type: Number, default: 0 } 
});
const EmployeeModel = mongoose.model('EmployeeModel', employeeSchema, 'tblEmployee');

module.exports = EmployeeModel;