import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getWeather, getWeatherImg } from './data';
import wind from "./assets/wind.png";
import visibility from "./assets/visibility.png";
import humidity from "./assets/humidity.png";
import history from "./assets/history.png";

function App() {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState(new Date());
  const textInput = useRef();
  const [currentWeather, setCurrentWeather] = useState();
  const [location, setLocation] = useState()
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const [image, setImage] = useState();
  var searchHistory = [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      getWeather(textInput.current.value, setCurrentWeather, setLocation, setImage);
      searchHistory.push(textInput.current.value);
    }
  }

  const InfoCard = ({img, head, data}) => {
    return <div className="info-card flex-d-col">
      <div className="font-20">{head}</div>
      <img src={img} alt="" />
      <div className="font-32 bold">{data}</div>
    </div>
  }

  return (
    <div className='App flex'>
      {image && <img id='weather-back-img' src={image} alt="" />}
      {/* left side of the weather app */}
      <div className="left">

        {/* weather card shown on bottom left */}
        {currentWeather &&
          <>
            <div className="weather-card">
              <div className="weather-icon">
                <img src={currentWeather.condition.icon} alt="weather icon" />
              </div>
              <div className="weather-info">
                <div className="weather-temp main-info font-32 bold">{currentWeather.temp_c} °C</div>
                <div className="main-info font-20">{currentWeather.condition.text}</div>

                <div className="horizontal-line"></div>

                <div className="other-info">
                  <div>{location.name}, {location.country}</div>
                </div>
                <div className="other-info">
                  <div>{days[date.getDay()]}, {date.toDateString().slice(3, -4)}</div>
                </div>
              </div>
            </div> 
            <InfoCard img={wind} head={"Wind"} data={`${currentWeather.wind_kph} Km/h, ${currentWeather.wind_dir}`} /> 
            <InfoCard img={humidity} head={"Humidity"} data={`${currentWeather.humidity}%`} /> 
            <InfoCard img={visibility} head={"Visibility"} data={`${currentWeather.vis_km} km`} />
          </>
        }
      </div>

      {/* right side of the weather app */}
      <div className="right">
        <div className="search-area">
          <input ref={textInput} type="text" name="searchbar" id="searchbar" onKeyUp={handleKeyUp} placeholder='search city' />
          <div className="search-history">
            {searchHistory?.length > 0 && 
              searchHistory.map((item, index)=>{
                return <div className="search-history-item" key={index}>
                  <img src={history} alt="" /> {item}
                </div>
              })
            }
          </div>
        </div>
        <div className="date text-right">
          <div className="font-26">{date.toDateString().slice(0, -4)}</div>
          <div className="font-20">{date.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}

export default App
