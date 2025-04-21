
const express = require('express');
const router = express.Router();
const accountYearController=require('../controllers/AccountYearController')
router.get('/accountYear',
        // #swagger.tags = ['AccountYear']
    accountYearController.getPagination);
router.post('/accountYear',
      // #swagger.tags = ['AccountYear']
    accountYearController.create);
router.delete('/accountYear/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.delete);
router.get('/accountYear/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.get);
router.put('/accountYear/:id',
      // #swagger.tags = ['AccountYear']
    accountYearController.update);
module.exports = router;