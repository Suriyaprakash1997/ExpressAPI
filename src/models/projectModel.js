const mongoose = require('mongoose');
function generateUID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
}
const projectSchema = new mongoose.Schema({
    UID:{ type: String, default: () => generateUID(10), unique: true  },
    ProjectName: { type: String, required: true },
    CustomerId: { type: String,required:true },
    TicketURL: { type: String,default:'' },
    LiveURL: { type: String,default:'' },
    UatURL: { type: String,default:'' },
    SourceOwnership: { type: String,default:'' },
    Status: { type: Number,default:1 },
    CreatedOn: { type: Date, default: Date.now },
    ModifiedOn: { type: Date,default:null },
    IsDelete: { type: Number, default: 0 } 
});
const ProjectModel = mongoose.model('ProjectModel', projectSchema, 'tblProject');

module.exports = ProjectModel;