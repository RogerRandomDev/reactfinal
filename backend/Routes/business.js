const express = require('express');
const cors = require('cors');
const router = express.Router();
router.options('*', cors());

router.use((req, res, next) => {
  next();
});

router.get('/show', async (req, res) => {});

module.exports = router;
