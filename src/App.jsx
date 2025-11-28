import React, { useState, useEffect } from 'react';
import { Logo } from './assets/Constant';

const App = () => {
const [city, setCity] = useState("Delhi");
const [inputCity, setInputCity] = useState("");
const [weatherData, setWeatherData] = useState(null);
const [unit,setUnit] = useState("C")

const converttemp=(temp)=>{
  return unit === "C" ? temp : (temp * 9/5) + 32;
};

const getWeather = async () => {
const api_fetch = await fetch(`http://api.weatherapi.com/v1/current.json?key=1c79085d11f542499af53513240405&q=${city}&aqi=yes`);
const data = await api_fetch.json();
setWeatherData(data); 
};


useEffect(() => { getWeather(); }, []);
useEffect(() => { if (city) getWeather(); }, [city]);

return ( <div className="min-h-screen bg-linear-to-b from-blue-950 via-blue-950 to-blue-950 text-white flex flex-col items-center p-4 animate-gradientBackground">
   <header className='w-full flex flex-col md:flex-row items-center justify-between bg-blue-950 p-5 rounded-lg shadow-md mb-6'> 
    <div className='flex items-center mb-4 md:mb-0'> 
      <img src={Logo} alt='Logo' className='w-20 h-20 mr-4'/> 
      <h1 className='text-3xl md:text-4xl font-bold'>Weather Forecasting</h1> </div>
      
       <div className='flex items-center'>
         <button
      className="bg-black text-white px-4 py-3 m-5 rounded mb-4"
      onClick={() => setUnit(unit === "C" ? "F" : "C")}
    >
      Switch to °{unit === "C" ? "F" : "C"}
    </button>
<input
type='text'
placeholder='Enter your city'
className='h-10 w-48 md:w-64 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-amber-400'
onChange={(e) => setInputCity(e.target.value)}
/>
<button
className='ml-2 p-2 rounded bg-amber-500 text-white font-bold hover:bg-amber-600 transition duration-200'
onClick={() => setCity(inputCity)}
>
Search </button> </div> </header>

  <div>
    {weatherData ? (


      <>{/* City Centered */} <div className='text-center mb-6'> 
      <h2 className='text-4xl font-extrabold'>{weatherData.location.region}, {weatherData.location.country}</h2>
       <p className='text-xl font-semibold mt-2'>{weatherData.current.condition.text}</p>
        <p className='text-lg mt-1'>Temperature: <span className='font-bold'>{converttemp(weatherData.current.temp_c)}°{unit}</span></p> 
        <img src={weatherData.current.condition.icon} alt='Weather Icon' className='w-28 h-28 mx-auto mt-2'/> </div>
        <div className='flex flex-col md:items-start items-center mt-4 md:mt-0 text-center md:text-left'>
         <div className='w-full flex flex-col md:flex-row justify-between text-center md:text-left mt-6'> {/* Details */}
           <div className='flex-1 flex flex-wrap justify-center md:justify-start mb-6 md:mb-0'> 
            <h3 className='w-full text-2xl text-center  font-bold mb-3'>Details</h3> 
            <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>Wind:</span> {weatherData.current.wind_kph} kph</p> 
            
            <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>Humidity:</span> {weatherData.current.humidity}%</p> 
            <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>Cloud Cover:</span> {weatherData.current.cloud}%</p>
             <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>Feels Like:</span> {converttemp(weatherData.current.feelslike_c)}°{unit}</p> </div> {/* Air Quality */} 
             <div className='flex-1 flex flex-wrap justify-center md:justify-end'> 
              <h3 className='w-full text-2xl text-center font-bold mb-3'>Air Quality (US AQI)</h3> 
              <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>CO:</span> {weatherData.current.air_quality.co.toFixed(2)}</p> 
              <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>NO₂:</span> {weatherData.current.air_quality.no2.toFixed(2)}</p> 
              <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>O₃:</span> {weatherData.current.air_quality.o3.toFixed(2)}</p> 
              <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>SO₂:</span> {weatherData.current.air_quality.so2.toFixed(2)}</p> 
              <p className='w-1/2 md:w-auto mx-2 my-1'><span className='font-semibold'>PM2.5:</span> {weatherData.current.air_quality.pm2_5.toFixed(2)}</p> </div> </div>
        </div></>
    
  ) : (
    <p className='text-lg mt-6'>Loading weather data...</p>
  )}

  </div>
</div>

);
};

export default App;

