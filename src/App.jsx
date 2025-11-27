import React, { useState, useEffect } from 'react';
import { Logo } from './assets/Constant';

const App = () => {
const [city, setCity] = useState("Delhi");
const [inputCity, setInputCity] = useState("");
const [weatherData, setWeatherData] = useState(null);

const getWeather = async () => {
try {
const api_fetch = await fetch(`http://api.weatherapi.com/v1/current.json?key=1c79085d11f542499af53513240405&q=${city}&aqi=yes`);
const data = await api_fetch.json();
setWeatherData(data);
} catch (error) {
console.error("Error fetching weather:", error);
}
};

useEffect(() => { getWeather(); }, []);
useEffect(() => { if (city) getWeather(); }, [city]);

return ( <div className="min-h-screen bg-linear-to-b from-blue-500 via-blue-600 to-blue-900 text-white flex flex-col items-center p-4 animate-gradientBackground"> <header className='w-full flex flex-col md:flex-row items-center justify-between bg-blue-800 p-5 rounded-lg shadow-md mb-6'> <div className='flex items-center mb-4 md:mb-0'> <img src={Logo} alt='Logo' className='w-20 h-20 mr-4'/> <h1 className='text-3xl md:text-4xl font-bold'>Weather Forecasting</h1> </div> <div className='flex items-center'>
<input
type='text'
placeholder='Enter your city'
className='h-10 w-48 md:w-64 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-amber-400'
onChange={(e) => setInputCity(e.target.value)}
/>
<button
className='ml-2 p-2 rounded bg-amber-500 text-black font-bold hover:bg-amber-600 transition duration-200'
onClick={() => setCity(inputCity)}
>
Search </button> </div> </header>

```
  {weatherData ? (
    <div className='bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:w-2/3 w-full flex flex-col md:flex-row items-center justify-between hover:scale-105 transition-transform duration-300'>
      <div className='flex flex-col items-center mb-6 md:mb-0'>
        <h2 className='text-2xl font-bold'>{weatherData.location.region}, {weatherData.location.country}</h2>
        <img src={weatherData.current.condition.icon} alt='Weather Icon' className='w-24 h-24 my-2'/>
        <p className='text-xl'>{weatherData.current.condition.text}</p>
        <p className='text-lg'>Temperature: {weatherData.current.temp_c}°C</p>
      </div>

      <div className='flex flex-col md:items-start items-center mt-4 md:mt-0'>
        <h3 className='text-xl font-semibold mb-2'>Details</h3>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {weatherData.current.wind_kph} kph</p>
        <p>Cloud Cover: {weatherData.current.cloud}%</p>
        <p>Feels Like: {weatherData.current.feelslike_c}°C</p>

        <h3 className='text-xl font-semibold mt-4 mb-2'>Air Quality (US AQI)</h3>
        <p>CO: {weatherData.current.air_quality.co.toFixed(2)}</p>
        <p>NO₂: {weatherData.current.air_quality.no2.toFixed(2)}</p>
        <p>O₃: {weatherData.current.air_quality.o3.toFixed(2)}</p>
        <p>SO₂: {weatherData.current.air_quality.so2.toFixed(2)}</p>
        <p>PM2.5: {weatherData.current.air_quality.pm2_5.toFixed(2)}</p>
      </div>
    </div>
  ) : (
    <p className='text-lg mt-6'>Loading weather data...</p>
  )}

  {/* Optional: Animated background effect */}
  <style>{`
    @keyframes gradientBackground {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradientBackground {
      background-size: 400% 400%;
      animation: gradientBackground 15s ease infinite;
    }
  `}</style>
</div>

);
};

export default App;

