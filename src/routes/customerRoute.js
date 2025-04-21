
const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customerController')
router.get('/customer',
     // #swagger.tags = ['Customer']
    customerController.getPagination);
router.post('/customer',
     // #swagger.tags = ['Customer']
    customerController.create);
router.delete('/customer/:id',
     // #swagger.tags = ['Customer']
    customerController.delete);
router.get('/customer/:id',
     // #swagger.tags = ['Customer']
    customerController.get);
router.put('/customer/:id',
     // #swagger.tags = ['Customer']
    customerController.update);
module.exports = router;