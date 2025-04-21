const express = require('express');
const router = express.Router();
const dropdownController=require('../controllers/dropdownController')
router.get('/dropdown',
     // #swagger.tags = ['Dropdown']
    dropdownController.get);
module.exports = router;