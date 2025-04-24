
const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customerController')
router.get('/',
     // #swagger.tags = ['Customer']
    customerController.getPagination);
router.post('/',
     // #swagger.tags = ['Customer']
    customerController.create);
router.delete('/:id',
     // #swagger.tags = ['Customer']
    customerController.delete);
router.get('/:id',
     // #swagger.tags = ['Customer']
    customerController.get);
router.put('/:id',
     // #swagger.tags = ['Customer']
    customerController.update);
module.exports = router;