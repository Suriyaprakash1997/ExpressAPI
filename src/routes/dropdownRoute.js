const express = require('express');
const router = express.Router();
const dropdownController=require('../controllers/dropdownController')
router.get('/',
     // #swagger.tags = ['Dropdown']
    dropdownController.get);
module.exports = router;