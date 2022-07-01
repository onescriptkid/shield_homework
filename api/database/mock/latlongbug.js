const {
  generateRandomPoint,
  generateRandomPoints
} = require('generate-random-points')

const options = {
  centerPosition: {
    latitude: 24.23,
    longitude: 23.12
  },
  radius: 1000,
  count: 2
}

let listOfPoints = generateRandomPoints(options.centerPosition, options.radius, options.count)
let singlePoint = generateRandomPoint(options.centerPosition, options.radius)

console.log(singlePoint);


