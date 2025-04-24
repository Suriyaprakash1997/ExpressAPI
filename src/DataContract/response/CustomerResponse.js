class CustomerResponse{
    /**
  * @param {string} id
  * @param {string} customerName
  * @param {string} companyName
  * @param {string} address
  * @param {string} phone
  * @param {string} email
  * @param {string} mobile
  * @param {string} currency
  * @param {string} currencyCode
  * @param {number} status
  * @param {number} gST
  * @param {string} gSTNumber
  * @param {number} countryCode
  */
    constructor(id='',customerName = '', companyName = '',address = '',
        phone='', email = '', mobile = '', currency = '', currencyCode = '', status = 0,
          gST = 0, gSTNumber = '',countryCode = 0)
     {
        this.id = id;
        this.customerName = customerName;
        this.companyName = companyName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.mobile = mobile;
        this.currency = currency;
        this.currencyCode = currencyCode;
        this.status = status;
        this.gST = gST;
        this.gSTNumber = gSTNumber;
        this.countryCode = countryCode;
     }
     static fromEntity(entity) {
      if (!entity) return null;
      return new CustomerResponse(
          String(entity._id), // Convert to string
          entity.CustomerName,
          entity.CompanyName,
          entity.Address,
          entity.Phone,
          entity.Email,
          entity.Mobile,
          entity.Currency,
          entity.CurrencyCode,
          entity.Status,
          entity.GST,
          entity.GSTNumber,
          entity.CountryCode
      );
  }
}
module.exports = CustomerResponse;