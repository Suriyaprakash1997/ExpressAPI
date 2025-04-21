const express = require('express');
const router = express.Router();
const projectController=require('../controllers/projectCotroller')
router.get('/project', 
      // #swagger.tags = ['Project']
    projectController.getPagination);
router.post('/project',
     // #swagger.tags = ['Project']
    projectController.create);
router.delete('/project/:id',
     // #swagger.tags = ['Project']
    projectController.delete);
router.get('/project/:id',
     // #swagger.tags = ['Project']
    projectController.get);
router.put('/project/:id',
     // #swagger.tags = ['Project']
    projectController.update);
module.exports = router;