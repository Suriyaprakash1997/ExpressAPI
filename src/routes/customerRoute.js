const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customerController')
router.get('/customer', customerController.getPagination);
router.post('/customer',customerController.create);
router.delete('/customer/:id',customerController.delete);
router.get('/customer/:id',customerController.get);
router.put('/customer/:id',customerController.update);
module.exports = router;