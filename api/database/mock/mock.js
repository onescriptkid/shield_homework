let faker = require('faker');
const { generateRandomPoint } = require('generate-random-points');
const uuid = require('uuid');

// Builds 1000 logs
function buildLogs() {
  const logs = [];
  for (let i = 0; i < 1000; i++) {
    logs.push(buildLog());
  }
  return logs;
}

//Generates fake logs
function buildLog() {
  const date = new Date();
  const last7Days = date.setDate(date.getDate() - Math.floor(Math.random() * 7));
  const start_time = date;
  const end_time = new Date(date.getTime() + Math.ceil(Math.random() * 30) * 60 * 1000);
  building_map_layout = uuid.v4();

  const pittsburgh = {
    latitude: 40.44575,
    longitude: -79.98272
  };
  const radius = 1600 * 20;
  const singlePoint = generateRandomPoint(pittsburgh, radius);
  const fakeData = {
    //serial
    drone_generation: Math.floor(Math.random() * 20),
    start_time: start_time.toISOString(),
    end_time: end_time.toISOString(),
    lat: singlePoint.latitude.toFixed(6),
    lng: singlePoint.longitude.toFixed(6),
    building_map_layout: building_map_layout,
    created_at: end_time.toISOString(),
    // created at
    username: faker.name.findName().replace(`'`,'')
  }
  return fakeData;
}


module.exports = {
  buildLogs,
  buildLog
}


