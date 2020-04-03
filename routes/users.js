var express = require('express');
var router = express.Router();

const multer = require('multer')
const path = require('path')

var adminController= require('../controllers/adminController')

let storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null,'public/uploads')
  },

  filename(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }

})

let upload = multer({storage:storage})

router.get('/create',adminController.show)

router.post('/create',upload.any(),adminController.store)

router.get('/login',adminController.showLogin)

router.post('/login',adminController.verifyLogin)



module.exports = router;
