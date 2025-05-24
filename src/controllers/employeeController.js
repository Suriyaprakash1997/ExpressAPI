const XLSX = require("xlsx");
const path = require("path");
const CustomerResponse = require('../DataContract/response/CustomerResponse');
const Employee = require("../models/employeeModel");

exports.uploadFile = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded or invalid file type" });
    }

    try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const formattedData = sheetData.map((row) => {
      // Convert Excel date serial to JS Date if dateOfJoin is a number
      let formattedDate = row["DateOfBirth"];
      let formattedDateofJoin = row["DateOfJoin"];
      if (typeof formattedDate === "number") {
        const jsDate = XLSX.SSF.parse_date_code(formattedDate);
        if (jsDate) {
          // Pad day and month with leading zeros
          const day = String(jsDate.d).padStart(2, '0');
          const month = String(jsDate.m).padStart(2, '0');
          const year = jsDate.y;
          formattedDate = `${year}-${month}-${day}`;
        }
      }
       if (typeof formattedDateofJoin === "number") {
        const jsDate = XLSX.SSF.parse_date_code(formattedDateofJoin);
        if (jsDate) {
          // Pad day and month with leading zeros
          const day = String(jsDate.d).padStart(2, '0');
          const month = String(jsDate.m).padStart(2, '0');
          const year = jsDate.y;
          formattedDateofJoin = `${year}-${month}-${day}`;
        }
      }
      return {
        EmployeeCode: row["EmployeeCode"],
        EmployeeName: row["EmployeeName"],
        EmailID: row["EmailID"],
        DateOfBirth: new Date(formattedDate),
        DateOfJoin:new Date(formattedDateofJoin) ,
        Salary: row["Salary"],
      };
    });
const result= await Employee.insertMany(formattedData);
    if (!result) {
      return res.status(400).json({ success: false, message: "Error inserting data into the database" });
    }

    res.status(200).json({
      success: true,
      message: "Employee data uploaded successfully",
    });

  } catch (error) {
    console.error("Error processing file:", error.message);
    res.status(500).json({ message: "Error processing file", error: error.message });
  }
};

exports.downloadTemplate = (req, res) => {
  try {
    const templatePath = path.join(__dirname, "..", "..", "template", "employee-template.xlsx");
    
    res.download(templatePath, "employee-template.xlsx", (err) => {
      if (err) {
        console.error("Error downloading template:", err.message);
        res.status(500).json({ message: "Error downloading template", error: err.message });
      }
    });

  } catch (error) {
    console.error("Error in downloadTemplate:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};