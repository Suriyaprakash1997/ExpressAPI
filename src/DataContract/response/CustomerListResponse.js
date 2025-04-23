class CustomerListResponse{
    /**
  *@param {string} id
  * @param {string} customerName
  * @param {string} companyName
  * @param {string} address
  * @param {string} phone
  * @param {string} email
  * @param {string} currency
  * @param {number} status
  */
    constructor(id='',customerName = '', companyName = '',address = '',
        phone='', email = '', currency = '', status = 0)
     {
       this.id = id;   
       this.customerName = customerName;
       this.companyName = companyName;
       this.address = address;
       this.phone = phone;
       this.email = email;
       this.currency = currency;
       this.status = status;
     }
     static fromEntity(entity) {
      if (!entity) return null;
      return new CustomerListResponse(
          String(entity._id), // Convert to string
          entity.CustomerName,
          entity.CompanyName,
          entity.Address,
          entity.Phone,
          entity.Email,
          entity.Currency,
          entity.Status,
      );
  }
}
module.exports = CustomerListResponse;