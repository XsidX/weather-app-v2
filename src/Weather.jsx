import React, { useState, useEffect } from 'react'

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('nairobi')
  const [error, setError] = useState("")

  const fetchWeatherData = async(cityName) => {

    setLoading(true)

    try{
    const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    if(!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeather API key.")
      } else if(response.status === 404) {
        throw new Error(`City ${cityName}, not found. Please check your spelling`)
      }
    }

    console.log(response)

    const data = await response.json()

    setWeatherData(data)
    }catch(error){
    // caught in here
    setError(error instanceof Error ? error.message : "Failed to fetch weather data")

    }finally{
      setLoading(false)
    } 
  }

  useEffect(() => {
    fetchWeatherData(city)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()

    if(city.trim()){
      fetchWeatherData(city.trim())
    }
  }

  console.log(weatherData)



  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-300 via-green-300 to-blue-600'>
      <div className='max-w-md mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Weather App</h1>
          <p className='text-blue-100'>Get curent weather for any city</p>
        </div>

        {/* Search Form */}

        <form onSubmit={handleSubmit} className='mb-6'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter city name...'
              className='flex-1 px-4 py-2 text-white font-extrabold rounded-lg bg-blue-300 border border-blue-200/20 focus:outline-none focus:ring-2 focus:ring-blue-200/30'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200/30 cursor-pointer'
            >
              Search
            </button>
          </div>
        </form>

        {
          error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 rounded-lg mb-6'>
              <p className='font-semibold'>Error:</p>
              <p>{error}</p>
            </div>
          )
        }

        {loading && (
          <div className='text-center bg-white rounded-lg p-8 shadow-lg'>
            <div className='animate-spin rounded-full h-12 w-12 border-2 border-blue-600 mx-auto mb-4 ' />
            <p className='text-gray-600'>Fetching weather data</p>
          </div>
        )}

        {
          weatherData && !loading && (
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                <p className='text-gray-600 capitalize'>{weatherData.weather[0].description}</p>
              </div>

              <div className='text-center mb-6'>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  className='mx-auto mb-2'
                />

                <div className='text-4xl font-bold text-gray-800 mb-2'>{Math.round(weatherData.main.temp)}°C</div>
                <div className='text-sm text-gray-500'>Feels like {Math.round(weatherData.main.feels_like)}°C</div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center p-4 rounded-lg bg-blue-50'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {weatherData.main.humidity}%
                  </div>
                  <div className='text-sm text-gray-600'>
                    Humidity
                  </div>
                </div>
                <div className='text-center p-4 rounded-lg bg-purple-50'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {weatherData.main.pressure} pa
                  </div>
                  <div className='text-sm text-gray-600'>
                    Pressure
                  </div>
                </div>
                <div className='text-center p-4 rounded-lg bg-green-50'>
                  <div className='text-2xl font-bold text-green-600'>
                    {Math.round(weatherData.wind.speed)} m/s
                  </div>
                  <div className='text-sm text-gray-600'>
                    Wind Speed
                  </div>
                </div>
                <div className='text-center p-4 rounded-lg bg-orange-50'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {weatherData.weather[0].main}
                  </div>
                  <div className='text-sm text-gray-600'>
                    Condition
                  </div>
                </div>
              </div>
              
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Weather
