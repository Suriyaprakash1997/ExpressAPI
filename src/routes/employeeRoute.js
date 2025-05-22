const express = require('express');
const router = express.Router();
const emp=require('../controllers/employeeController')
const multer = require("multer");
const path = require('path')
const filePath = path.join(__dirname,"..","..", "uploads");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, filePath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .xls and .xlsx files are allowed"));
    }
  },
});

router.post('/upload',upload.single("file"),
     // #swagger.tags = ['Employee']
    emp.uploadFile);

router.get('/downloadtemplate',
      // #swagger.tags = ['Employee']
    emp.downloadTemplate);

    module.exports = router;