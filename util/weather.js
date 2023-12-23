const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getWeather() {
    let weatherReport;
    await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=Delhi,India&aqi=no`).then(weatherInfo => {
        const temp = 'Temperature of delhi is ' + weatherInfo.data.current.feelslike_c + ' C,\n';
        const wind = `Today's average wind speed is ${weatherInfo.data.current.wind_kph} towards ${weatherInfo.data.current.wind_dir},\n`;
        const precip = `Precepitation chances are ${weatherInfo.data.current.precip_in}.`

        weatherReport = temp.concat(wind, precip);
    })

    return weatherReport;
}

module.exports = getWeather