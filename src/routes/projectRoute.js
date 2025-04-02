const express = require('express');
const router = express.Router();
const projectController=require('../controllers/projectCotroller')
router.get('/project', projectController.getPagination);
router.post('/project',projectController.create);
router.delete('/project/:id',projectController.delete);
router.get('/project/:id',projectController.get);
router.put('/project/:id',projectController.update);
module.exports = router;