
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'upload/'});
const fs = require('fs');
const { getAllLogs, getLogsFiltered } = require('./database/queries.js');
const { insertLogsCSV } = require('./database/mutations.js');
const { performance } = require('perf_hooks');

router.get('/getLogs', async function(req, res) {
  const filters = req.query;
  const getLogs =  Object.keys(filters).length === 0 ? getAllLogs : () => getLogsFiltered(filters);
  const start = performance.now();
  
  await getLogs().then(r => {
    res.status(200);
    const end = performance.now();

    console.log(`DURATION ${((end - start) / 1000).toFixed(4)} SECONDS`)
    res.json({
      data: r.rows,
      error: null,
      success: true
    });
  }).catch(e => {
    res.status(500);
    res.json({
      data: null,
      error: e && e.stack,
      success: false
    });
  });
})

router.post('/insertLogs', upload.single('file'), async function(req, res) {

  const start = performance.now();
  //Error if file is missing
  const file = req.file;
  if(!file) {
    res.json({
      data: null,
      error: Error('File Missing'),
      success: false
    });
  } else {
    await insertLogsCSV(file.path).then(() => {
      if (file) {
        fs.unlink(file.path);
      }

      const end = performance.now();
      console.log(`DURATION ${((end - start) / 1000).toFixed(4)} SECONDS`)
      res.json({
        data: null,
        error: null,
        success: true
      });
    }).catch(e => {
      if (file) {
        fs.unlink(file.path);
      }
      res.json({
        data: null,
        error: e && e.stack,
        success: false
      });
    })
  }
});

module.exports = router; 