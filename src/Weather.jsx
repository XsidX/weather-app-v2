import React, { useState, useEffect } from 'react'

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "febb2fac18df7f0e8a2e8b751cb4cc72"

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState('nairobi')

  const fetchWeatherData = async(cityName) => {
    const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)

    const data = await response.json()

    setWeatherData(data)
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
          weatherData && (
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Weather
