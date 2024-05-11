
const express = require('express');
const router = express.Router();
const { profileController } = require('../Controllers/ProfileControllers');

// Define route for profile page
router.get('/', profileController);

module.exports = router;
