const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
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