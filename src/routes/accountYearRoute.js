
const express = require('express');
const router = express.Router();
const accountYearController=require('../controllers/AccountYearController')
router.get('/',
        // #swagger.tags = ['AccountYear']
    accountYearController.getPagination);
router.post('/',
      // #swagger.tags = ['AccountYear']
    accountYearController.create);
router.delete('/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.delete);
router.get('/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.get);
router.put('/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.update);
module.exports = router;