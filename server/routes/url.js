const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirect } = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortURL); // Endpoint to generate a new short URL
router.get('/:shortId', handleRedirect ); // Endpoint to redirect to the original URL
router.get('/analytics/:shortId', handleGetAnalytics ); // Endpoint to get analytics for a short URL

module.exports = router;