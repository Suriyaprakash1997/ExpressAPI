class CustomerResponse{
    /**
  * @param {string} id
  * @param {string} customerName
  * @param {string} companyName
  * @param {string} address
  * @param {string} phone
  * @param {string} email
  * @param {string} mobile
  * @param {string} web
  * @param {string} skype
  * @param {string} elance
  * @param {string} freelancer
  * @param {string} upwork
  * @param {string} currency
  * @param {string} currencyCode
  * @param {number} status
  * @param {number} gST
  * @param {string} gSTNumber
  * @param {number} countryCode
  * @param {string} attentionPerson
  * @param {string} attentionDesignation

  */
    constructor(id='',customerName = '', companyName = '',address = '',
        phone='', email = '', mobile = '', web = '', skype = '', elance = '',
         freelancer = '', upwork = '', currency = '', currencyCode = '', status = 0,
          gST = 0, gSTNumber = '',countryCode = 0, attentionPerson = '', attentionDesignation = '')
     {
        this.id = id;
        this.customerName = customerName;
        this.companyName = companyName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.mobile = mobile;
        this.web = web;
        this.skype =skype;
        this.elance = elance;
        this.freelancer = freelancer;
        this.upwork = upwork;
        this.currency = currency;
        this.currencyCode = currencyCode;
        this.status = status;
        this.gST = gST;
        this.gSTNumber = gSTNumber;
        this.countryCode = countryCode;
        this.attentionPerson = attentionPerson;
        this.attentionDesignation = attentionDesignation;
     }
}
module.exports = CustomerResponse;