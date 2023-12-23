const axios = require('axios');

async function getWeather() {
    let weatherReport;
    await axios.get('http://api.weatherapi.com/v1/current.json?key=9753e949d7ca4f08ae1162446232312&q=Delhi,India&aqi=no').then(weatherInfo => {
        const temp = 'Temperature of delhi is ' + weatherInfo.data.current.feelslike_c + ' C,\n';
        const wind = `Today's average wind speed is ${weatherInfo.data.current.wind_kph} towards ${weatherInfo.data.current.wind_dir},\n`;
        const precip = `Precepitation chances are ${weatherInfo.data.current.precip_in}.`

        weatherReport = temp.concat(wind, precip);
    })

    return weatherReport;
}

module.exports = getWeather