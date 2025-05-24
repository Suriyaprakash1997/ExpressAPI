class CreateEmployeeRequest{
    /**
  * @param {string} EmployeeCode
  * @param {string} EmployeeName
  * @param {Date} DateOfBirth
  * @param {Date} DateOfJoin
  * @param {string} EmailID
  * @param {number} Salary
  */
    constructor(EmployeeCode = '', EmployeeName = '',DateOfBirth = null,
        DateOfJoin=null, EmailID = '', Salary = 0)
     {
        this.EmployeeCode = EmployeeCode;
        this.EmployeeName = EmployeeName;
        this.DateOfBirth = DateOfBirth;
        this.DateOfJoin = DateOfJoin;
        this.EmailID = EmailID;
        this.Salary = Salary;
     }
}
module.exports = CreateEmployeeRequest;