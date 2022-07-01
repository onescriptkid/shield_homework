const Postgres = require('./postgres');
const postgres = new Postgres();
const fs = require('fs');
const { from } = require('pg-copy-streams');

//mutations
//Insert a single log
function insertLog(values) {
  return postgres.query(`
			Insert into logs values (
        DEFAULT, --id
        $1, --drone_generation
        $2, --start_time

        $3, --end_time
        $4, --lat
        $5, --lng

        $6, --building_map_layout
        $7, --created_at
        $8) --username
		`, values);
}

//Insert multiple logs
function insertLogs(logset) {
  const values = logset.map(log => {
    log = log.map(v => `'${v}'`);
    return `(${log.join(',')})`
  }).join(',');
  const query = `
    Insert into logs (
      drone_generation,
      start_time, end_time,
      lat, lng,
      building_map_layout,
      created_at, username) VALUES
    ${values}
		`
  return postgres.query(query);
}

//Insert multiple logs via copy and filereadstream
function insertLogsCSV(path) {
  return postgres.connect().then(() => {
    //Gnarly promisified csv filestream dump to 
    return new Promise((resolve, reject) => {
      const stream = postgres.client.query(from(`
        COPY logs (
          drone_generation,
          start_time,
          end_time,
          lat,
          lng,
          building_map_layout,
          created_at, username)
        FROM STDIN DELIMITER ','`));
      const fileStream = fs.createReadStream(path);
      const onEnd = () => resolve()
      const onError = e => reject(e);
      fileStream.on('error', onError);
      stream.on('error', onError);
      stream.on('end', onEnd);
      fileStream.pipe(stream);
    });
  });
}

module.exports = {
  insertLog,
  insertLogs,
  insertLogsCSV
}