const express = require('express');
const router = express.Router();
const accountYearController=require('../controllers/AccountYearController')
router.get('/accountYear', accountYearController.getPagination);
router.post('/accountYear',accountYearController.create);
router.delete('/accountYear/:id',accountYearController.delete);
router.get('/accountYear/:id',accountYearController.get);
router.put('/accountYear/:id',accountYearController.update);
module.exports = router;