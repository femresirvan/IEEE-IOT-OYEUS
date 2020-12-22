const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController');
const notFoundController = require('../controller/notFoundController');
const historyController = require('../controller/gecmisVerilerController');
const apiController = require('../controller/apiController');
const jwtController = require('../controller/jwtController');
const aktifVeriler = require('../controller/aktifVerilerController');
const iletisimController = require('../controller/iletisimController');
const denemeController = require('../controller/denemeController')

router.get('/', indexController.renderIndex);
router.get('/aktif-veriler',aktifVeriler.aktifVeriler);
router.get('/gecmis-veriler', historyController.renderHistory);
router.get('/iletisim',iletisimController.renderIletisim);
router.get('/deneme',denemeController.renderDeneme);
router.get('/api/data/limit/:limit?/page-number/:pagenumber?/:danger?',apiController.getData);
router.get('/api/data/limit/:limit/field/:field/page-number/:pagenumber/:danger?',apiController.getDataByField);
router.get('/api/data/limit/:limit/field/:field/id/:id/page-number/:pagenumber/:danger?',apiController.getDatabyId);


//JWT
// router.get('/api/send-data' , jwtController.checkAuth,apiController.createData);
router.post('/api/getToken',jwtController.getToken);


module.exports = router;