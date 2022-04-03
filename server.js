const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const router = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use(express.json());

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

