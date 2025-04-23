class CreateCustomerRequest{
    /**
  * @param {string} CustomerName
  * @param {string} CompanyName
  * @param {string} Address
  * @param {string} Phone
  * @param {string} Email
  * @param {string} Mobile
  * @param {string} Web
  * @param {string} Skype
  * @param {string} Elance
  * @param {string} Freelancer
  * @param {string} Upwork
  * @param {string} Currency
  * @param {string} CurrencyCode
  * @param {number} Status
  * @param {number} GST
  * @param {string} GSTNumber
  * @param {number} CountryCode
  * @param {string} AttentionPerson
  * @param {string} AttentionDesignation

  */
    constructor(CustomerName = '', CompanyName = '',Address = '',
        Phone='', Email = '', Mobile = '', Web = '', Skype = '', Elance = '',
         Freelancer = '', Upwork = '', Currency = '', CurrencyCode = '', Status = 0,
          GST = 0, GSTNumber = '',CountryCode = 0, AttentionPerson = '', AttentionDesignation = '')
     {
        this.CustomerName = CustomerName;
        this.CompanyName = CompanyName;
        this.Address = Address;
        this.Phone = Phone;
        this.Email = Email;
        this.Mobile = Mobile;
        this.Web = Web;
        this.Skype = Skype;
        this.Elance = Elance;
        this.Freelancer = Freelancer;
        this.Upwork = Upwork;
        this.Currency = Currency;
        this.CurrencyCode = CurrencyCode;
        this.Status = Status;
        this.GST = GST;
        this.GSTNumber = GSTNumber;
        this.CountryCode = CountryCode;
        this.AttentionPerson = AttentionPerson;
        this.AttentionDesignation = AttentionDesignation;
     }
}
module.exports = CreateCustomerRequest;