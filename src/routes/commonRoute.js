const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController')

router.get('/invoice',
    // #swagger.tags = ['Common']
    commonController.getInvoiceNo);

    router.get('/customer/:id',
        // #swagger.tags = ['Common']
        commonController.getCustomerByUID);

    
module.exports = router;