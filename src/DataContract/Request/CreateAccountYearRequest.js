class CreateAccountYearRequest{
    /**
  * @param {string} AccountYear
  * @param {Date} StartDate
  * @param {Date} EndDate
  */
    constructor(AccountYear = '', StartDate = null,EndDate = null) {
       this.AccountYear = AccountYear;
       this.StartDate = StartDate;
        this.EndDate = EndDate;
     }
}
module.exports = CreateAccountYearRequest;