const express = require('express');
const router = express.Router();
const multer = require('multer');
const { detectPlague } = require('../controllers/plagueController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/detect', upload.single('image'), detectPlague);

module.exports = router;
