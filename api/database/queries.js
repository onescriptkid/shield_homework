const Postgres = require('./postgres');
const postgres = new Postgres();

function getAllLogs() {
  return postgres.queryPool('select * from logs;');
}

function getSomeLogs() {
  return postgres.queryPool('select * from logs limit 50');
}

function getLogsFiltered(filters) {
  const select = 'select * from logs where ';
  const wheres = buildWheres(filters);
  const query = select + wheres;
  return postgres.queryPool(query);
}

//Build Where clauses
function buildWheres(filters) {
  const wheres = [];
  const { username, generation, flight_time, created_at_end, created_at_start } = filters;
  const { lat_up, lat_down, lng_right, lng_left } = filters;
  if (username) {
    const filterUsername = `LOWER(username) like LOWER('%${username}%')`;
    wheres.push(filterUsername);
  }

  if (generation) {
    const filterGeneration = `drone_generation = '${generation}'`;
    wheres.push(filterGeneration);
  }

  // Date range = created_at - created_
  if (created_at_start) {
    let filter;
    //Start - End and Start - Start
    if(created_at_start && created_at_end) {
      filter = `created_at >= '${created_at_start}' and created_at <= ('${created_at_end}':: timestamp + INTERVAL '1 DAY')`;
    //Start - undefined
    } else if(created_at_start && created_at_end === undefined) {
      filter = `created_at >= '${created_at_start}'`
    }
    if(filter) {
      wheres.push(filter);
    }
  }

  //flight time in minutes
  if (flight_time) {
    let filter = `(end_time - start_time) <= INTERVAL '${flight_time} MINUTES'`;
    wheres.push(filter);
  }

  //LatLng
  if (lat_up && lat_down && lng_right && lng_left) {
    let filter = `lng > '${lng_left}' and lng < '${lng_right}' and lat < '${lat_up}' and lat > '${lat_down}'`;
    wheres.push(filter);
  }
  return wheres.join(' and ');
}

module.exports = {
  getAllLogs,
  getLogsFiltered
}