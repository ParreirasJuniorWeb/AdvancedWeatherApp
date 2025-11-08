import SearchBar from './components/SearchBar.jsx'
import TemperatureToggle from './components/TemperatureToggle.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import WeatherForecast from './components/WeatherForecast.jsx'
import { useWeather } from './hooks/useWeather.js'

function App() {

  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCityName,
    toggleUnit
  } = useWeather();
  
  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCityName(currentWeather.name);
    } else {
      fetchWeatherByCityName("New York");
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8 w-full" 
           style={{
             backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%), url('https://cdn.pixabay.com/photo/2019/10/17/18/15/forests-4557471_1280.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
      
        <div className="max-w-6xl w-full text-center text-white mt-4 space-y-8 px-4 md:px-0">
          {/* Header Section */}
          <header className="mb-12 px-4 md:px-0 text-center space-y-6 md:space-y-8 w-full">
            <div className="relative">
              <h1 className="text-6xl md:text-6xl font-black text-white mb-6 drop-shadow-3xl tracking-tight leading-none">
                Weather 
                <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent ml-3">
                  Pro
                </span>
              </h1>
              <div className="absolute -inset-4 bg-linear-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-full -z-10"></div>
            </div>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Stay ahead of the storm with WeatherPro, your ultimate weather companion. Get real-time updates. Accurate forecasts. Personalized alerts. All in one sleek app designed to keep you informed and prepared, no matter where you are.
            </p>
          </header>

          {/* Controls Section */}
          <div className="flex gap-6 lg:gap-8 justify-center items-center mb-16">
            <div className="w-full max-w-md">
              <SearchBar 
                onSearch={fetchWeatherByCityName} 
                disabled={loading}
                loading={loading}
              />
            </div>
            <div className="flex-shrink">
              <TemperatureToggle unit={unit} onToggle={toggleUnit}/>
            </div>
          </div>
        </div>

        {/* Main Content Section*/}
        <div className='space-y-12 w-full max-w-12xl px-4 md:px-0 mb-16'>
        {loading && (
          <div className='flex justify-center'>
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl w-full max-w-2xl flex flex-col items-center justify-center space-y-6
            md:p-10
            md:space-y-8
            lg:p-12
            lg:space-y-10
            xl:p-14
            xl:space-y-12
            2xl:p-16
            2xl:space-y-14 relative'>
            <LoadingSpinner />
            <p className='text-white/80 text-center mt-4 font-madium'>Loading weather data...
            </p>
            </div>
          </div>)}

        {error && !loading && (
          <div className='max-w-2xl mx-auto'>
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>)}

        {currentWeather && !loading && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className='xl:col-span-2'>
            <WeatherCard weather={currentWeather} unit={unit} />
            </div>
            <div className='xl:cols-span-1'>
              {forecast && <WeatherForecast forecast={forecast} unit={unit} />}
            </div>
          </div>)}

        </div>
      </div>
    </>
  )
}

export default App