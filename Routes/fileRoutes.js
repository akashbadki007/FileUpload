const express = require('express');
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,reducersImgUpload} = require('../Controller/fileController');

router.post('/localfileupload',localFileUpload);
router.post('/imageupload',imageUpload);
router.post('/videoupload',videoUpload);
router.post('/reducersimgupload',reducersImgUpload);
module.exports = router;