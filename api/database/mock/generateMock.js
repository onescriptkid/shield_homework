const buildLogs = require('./mock.js').buildLogs;
const buildLog = require('./mock.js').buildLog;
const {insertLog, insertLogs } = require('../mutations.js');
const { performance } = require('perf_hooks');

function generateOneLog() {
  const log = Object.values(buildLog());
  console.log(log);
  insertLog(log).then(r => {
    console.log(r);
  });
}

function generateThreeLogs() {
  const logset = [
    Object.values(buildLog()),
    Object.values(buildLog()),
    Object.values(buildLog())
  ];
  console.log(...logset);
  insertLogs(logset).then( r => {
    console.log(r)
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  })
}

function generateThousandLogs() {
  const logset = Object.values(buildLogs().map(l => Object.values(l)));
  const start = performance.now();
  console.log(logset);
  insertLogs(logset).then(r => {
    console.log(r);
    const end = performance.now();
    console.log(`\nDuration - ${((end-start)/1000).toFixed(4)} SECONDS`)
    process.exit(0);
  }).catch(e => {
    console.error(e);
    process.exit(1);
  })
}
// generateOneLog();
// generateThreeLogs();
generateThousandLogs();
