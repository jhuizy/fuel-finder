var xml2js = require('xml2js');
var request = require('request');
var geolib = require('geolib');

const fetchFuelPrices = (callback) => {
  request('http://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS', (err, res, body) => {
    if (err) {
      callback(err, null);
    } else {
      xml2js.parseString(body, (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          var json = res.rss.channel[0].item.map((item) => {
            return {
              title: item.title[0],
              description: item.description[0],
              brand: item.brand[0],
              price: item.price[0],
              name: item["trading-name"][0],
              location: item.location[0],
              coordinate: {
                latitude: item.latitude[0],
                longitude: item.longitude[0]
              }
            };
          });
          callback(null, json);
        }
      });
    }
  });
}

const nearestFuelPrices = (to, limit, callback) => {
  fetchFuelPrices((err, res) => {
    if (err) {
      callback(err, null);
    } else {
      var originalResults = res.reduce((map, next) => {
        map[next.name] = next;
        return map;
      });

      var coordinateResults = res.reduce((map, next) => {
        map[next.name] = next.coordinate;
        return map;
      }, {});

      var nearest = geolib.findNearest(to, coordinateResults, 0, limit);
      var result = nearest.map((i) => {
        return {
          item: originalResults[i.key],
          distance: i.distance
        };
      });

      callback(null, result);
    }
  })
};

module.exports.search = (event, context, callback) => {
  nearestFuelPrices(event, event.limit, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }

  });
};
