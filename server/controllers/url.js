const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if( !body.url ) return res.status(400).json({ error: 'url is required'});

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });

    return res.json({ id: shortID, shortURL: `http://localhost:5000/${shortID}` });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitedHistory: { timestamp: Date.now() } } }
  );
  if (urlEntry) {
    return res.redirect(urlEntry.redirectURL);
  }
  return res.status(404).json({ error: "URL not found" });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({
         totalClicks: result.visitedHistory.length,
          analytics: result.visitedHistory });
}

module.exports = {handleGenerateNewShortURL , handleGetAnalytics, handleRedirect };