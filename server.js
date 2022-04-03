const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const api = require('./routes/apiRoutes');
const router = express();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Middleware for parsing JSON and urlencoded form data
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use(express.json());

router.use('/api', api);
router.use('/', htmlRoutes);

// Server listening 
router.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);