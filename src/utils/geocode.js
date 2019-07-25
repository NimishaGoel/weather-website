const request = require("request");
const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibmltaXNoYWdvZWwiLCJhIjoiY2p5OHZ0dTFnMGM0OTNsbnFxNHk0Y2pndSJ9.wpnNp1kdjN9hTKsp7OP6NQ";
    request({url: url , json: true},(error,{body}) => {
        if(error)
        {
            callback({error:"Unable to Fetch mapbox website"},undefined)
        }else if(body.features.length ===0)
        {
            callback({error:"Unable to find the location"},undefined)
        }else{
        callback(undefined, {
            latitude : body.features[0].center[1], 
            longitude : body.features[0].center[0],
            location: body.features[0].place_name});
        }
    })
}

module.exports= geocode 