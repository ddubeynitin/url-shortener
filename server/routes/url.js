const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirect, keepAlive } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL); 
router.get('/keep-alive', keepAlive);
router.get('/analytics/:shortId', handleGetAnalytics );
router.get('/:shortId', handleRedirect ); 

module.exports = router;