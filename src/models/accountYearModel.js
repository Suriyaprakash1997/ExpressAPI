const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// Define User Schema
function generateUID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
}
const accountYearSchema = new mongoose.Schema({
    AccountYear: { type: String, required: true },
    UID:{ type: String, default: () => generateUID(10), unique: true  },
    StartDate: { type: Date,required: true  },
    EndDate: { type: Date,required: true  },
    IsDelete: { type: Number, default: 0 }
});

// Create User Model
const AccountYear = mongoose.model('AccountYear', accountYearSchema, 'tblAccountYear');

module.exports = AccountYear;