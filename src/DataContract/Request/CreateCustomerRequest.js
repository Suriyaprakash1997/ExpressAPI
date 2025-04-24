class CreateCustomerRequest{
    /**
  * @param {string} CustomerName
  * @param {string} CompanyName
  * @param {string} Address
  * @param {string} Phone
  * @param {string} Email
  * @param {string} Mobile
  * @param {string} Currency
  * @param {string} CurrencyCode
  * @param {number} Status
  * @param {number} GST
  * @param {string} GSTNumber
  * @param {number} CountryCode
  */
    constructor(CustomerName = '', CompanyName = '',Address = '',
        Phone='', Email = '', Mobile = '', Currency = '', CurrencyCode = '', Status = 0,
          GST = 0, GSTNumber = '',CountryCode = 0)
     {
        this.CustomerName = CustomerName;
        this.CompanyName = CompanyName;
        this.Address = Address;
        this.Phone = Phone;
        this.Email = Email;
        this.Mobile = Mobile;
        this.Currency = Currency;
        this.CurrencyCode = CurrencyCode;
        this.Status = Status;
        this.GST = GST;
        this.GSTNumber = GSTNumber;
        this.CountryCode = CountryCode;
     }
}
module.exports = CreateCustomerRequest;