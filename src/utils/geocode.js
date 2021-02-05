const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmlhbmNvZiIsImEiOiJja2tqMTFmaXIwMTc0Mm5wbWlkY3B3MGV2In0.8egZFR845lI_SdSVo1DYog&limit=1&autocomplete=false`;
    
    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect Geocoder Service.', undefined);
        } else if (!body.features.length) {
            callback('Unable to find location, try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;