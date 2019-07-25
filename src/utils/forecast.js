const request = require("request");
const forecast=(latitude,longitude, callback) => {
    const url ="https://api.darksky.net/forecast/f07414efc6b42b78dfcb2ce936df7cfe/"+latitude+","+longitude;

    request({ url: url, json: true }, (error, {body}) => {
        if(error)
        {
            callback("Unable to fetch website",undefined)
        }else if(body.currently=== undefined)
        {
            callback("Unable to find the coordinates",undefined)
        }else{
            const resdata= body.daily.data[0]
        callback(undefined, resdata.summary + " It is currently " + resdata.temperatureMax);
        }
});
}

module.exports= forecast