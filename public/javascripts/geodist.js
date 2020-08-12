// Generated by CoffeeScript 1.4.0
var getDistance, getEarthRadius, parseCoordinates, radiusUnits;

radiusUnits = {
  'feet': 20908800,
  'yards': 6969600,
  'miles': 3960,
  'mi': 3960,
  'kilometers': 6371,
  'km': 6371,
  'meters': 6371000
};

getDistance = function(start, end, options) {
  var a, c, distance, earthRadius, lat1, lat1Rad, lat2, lat2Rad, latDelta, lon1, lon2, lonDelta, _ref, _ref1;
  if (options == null) {
    options = {};
  }
  _ref = parseCoordinates(start), lat1 = _ref[0], lon1 = _ref[1];
  _ref1 = parseCoordinates(end), lat2 = _ref1[0], lon2 = _ref1[1];
  earthRadius = getEarthRadius(options.unit);
  latDelta = (lat2 - lat1) * Math.PI / 180;
  lonDelta = (lon2 - lon1) * Math.PI / 180;
  lat1Rad = lat1 * Math.PI / 180;
  lat2Rad = lat2 * Math.PI / 180;
  a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) + Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = earthRadius * c;
  if (!options.exact) {
    distance = Math.floor(distance);
  }
  if (options.limit) {
    if (options.limit > distance) {
      return true;
    } else {
      return false;
    }
  }
  if (options.format) {
    distance = "" + distance + " " + (options.unit || 'miles');
  }
  return distance;
};

parseCoordinates = function(point) {
  var coords, key, val;
  if (point == null) {
    point = [0, 0];
  }
  coords = [];
  if (Array.isArray(point)) {
    coords = point;
  } else if ((point.lat != null) && (point.lon != null)) {
    coords = [point.lat, point.lon];
  } else if (typeof point === 'object') {
    for (key in point) {
      val = point[key];
      coords.push(val);
    }
  } else {
    coords = point;
  }
  return coords;
};

getEarthRadius = function(unit) {
  if (unit == null) {
    unit = "miles";
  }
  unit = unit.toLowerCase();
  if (!radiusUnits[unit]) {
    unit = "miles";
  }
  return radiusUnits[unit];
};

//module.exports = getDistance;
