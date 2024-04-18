import sunny from "./assets/weather/sunny.avif";
import cloudy from "./assets/weather/cloudy.avif";
import foggy from "./assets/weather/foggy.avif";
import mist from "./assets/weather/mist.avif";
import thunder from "./assets/weather/thunder.avif";
import rainy from "./assets/weather/rainy.avif";
import snow from "./assets/weather/snow.avif";
import clear from "./assets/weather/clear.avif";
import wind from "./assets/weather/wind.avif";
import axios from 'axios';

export const getWeather = (weather, setCurrentWeather, setLocation, setImage) => {
  axios.post(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${weather}`, 
    {
      headers: { 'Content-Type': 'application/json'}
    }
  ).then(res => {
    setCurrentWeather(res.data.current)
    setLocation(res.data.location)
    getWeatherImg(res.data.current.condition.text, setImage)
  })
}

export const getWeatherImg = (weather, setImage) => {
  var temp = weather.toLowerCase();

  if(temp.includes("snow")){setImage(snow)}
  else if(temp.includes("mist")){setImage(mist)}
  else if(temp.includes("rain")){setImage(rainy)}
  else if(temp.includes("thunder")){setImage(thunder)}
  else if(temp.includes("fog")){setImage(foggy)}
  else if(temp.includes("cloud") || temp.includes("overcast")){setImage(cloudy)}
  else if(temp.includes("sun")){setImage(sunny)}
  else if(temp.includes("wind")){setImage(wind)}
  else if(temp.includes("clear")){setImage(clear)}
}