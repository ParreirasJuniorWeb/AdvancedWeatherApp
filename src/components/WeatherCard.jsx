import React from 'react';
import { MapPin, Sunrise, Sunset } from 'lucide-react';
import { 
  getWeatherIconByCode, 
  formatVisibility, 
  formatWindSpeed, 
  formatHumidity, 
  formatPressure, 
  formatTemperature ,
  getWeatherName,
  getWeatherCountry,
  DateTimeFormatter,
  getWeatherDescription,
  getWeatherSunrise,
  getWeatherSunset,
  formatTime,
  formatStatsLabel,
} from '../utils/WeatherUtils.js';
import * as LucideIcons from 'lucide-react';

const WeatherCard = ({ weather, unit="metric" }) => {
  const iconName = getWeatherIconByCode(weather?.weather[0]?.icon);
  const iconComponent = LucideIcons[iconName] ||  LucideIcons['Cloud'];

  const weatherStats = [
    {
      icon: 'Eye',
      label: "Visibility",
      value: formatVisibility(weather?.visibility),
      color: 'text-blue-300',
    },
    {
      icon: 'Wind',
      label: "Wind Speed",
      value: formatWindSpeed(weather?.wind?.speed, unit),
      color: 'text-green-300',
    },
    {
      icon: 'Droplet',
      label: "Humidity",
      value: formatHumidity(weather?.main?.humidity),
      color: 'text-cyan-300',
    },
    {
      icon: 'Gauge',
      label: "Pressure",
      value: formatPressure(weather?.main?.pressure),
      color: 'text-purple-300',
    },
    {
      icon: 'Thermometer',
      label: "Max Temp",
      value: formatTemperature(weather?.main?.temp_max, unit),
      color: 'text-orange-300',
    },
  ]; // Map Method Logic Here

  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 
    transition-all duration-500'>
      <div className='flex items-center justify-between mb-8'>
      <div className='flex items-center space-x-4'>
      <div className='p-3 bg-white/10 rounded-full'>
        <MapPin className='text-white/80 w-5 h-5' />
      </div>
      <div>
        <h2 className='text-white font-semibold text-lg'>{getWeatherName(weather) || 'Weather Name Not Found'}</h2>
        <p className='text-white/60 text-sm'>{getWeatherCountry(weather) || 'Country Not Found'}</p>
      </div>
      </div>
      <div className='text-right'>
        <div className='text-white/70 text-sm'>
          {/* Date and Time Here */}{DateTimeFormatter(new Date())}
        </div>
        <div className='text-white/70 text-xs'>
          {/* Weather Condition Here */}{getWeatherDescription(weather?.weather[0]?.main) || 'Description Not Found'}
        </div>
      </div>
      </div>

      {/** Weather Details Here */}
      <div className='flex items-center justify-between mb-10'>
      <div className='flex-1'>
        <div className='text-7xl font-bold text-white mb-3 tracking-tight'>
          {formatTemperature(weather?.main?.temp, unit) || '0°'}
        </div>
        <div className='text-white/90 text-xl capitalize  mb-2 font-medium'>
          {getWeatherDescription(weather?.weather[0]?.main) || 'Description Not Found'}
        </div>
        <div className='flex items-center space-x-4 text-white/60 text-sm'>
        <span>H: {formatTemperature(weather.main.temp_max, unit
        )}</span>
        <span>L: {formatTemperature(weather.main.temp_min, unit
        )}</span>
        </div>
      </div>

      <div className='text-white/90 transform hover:sscale-105 transition-transform duration-300'>
      {/* Weather Icon Here */}
        {React.createElement(iconComponent, { className: 'w-24 h-24' })}
        {getWeatherIconByCode(weather?.weather[0]?.icon) || 'Cloud'}{" | "}
        {getWeatherDescription(weather?.weather[0]?.description) || 'Weather description not found'}
        <div className='text-white/70 text-sm mt-2'>
          Feels like {formatTemperature(weather?.main?.feels_like, unit) || 'N/A'}
        </div>
      </div>
      </div>

      {/** Weather Stats Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
      {/* Map Method Logic */}
      {weatherStats.map((state, index) => { return (
      <div key={index} className='bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all p-4 flex flex-col items-center space-y-2 group cursor-pointer'>
      <div className='flex items-center space-x-3 mb-2'>
        <div className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300`}>
          {/* Icon Here */}
          {state.icon && React.createElement(LucideIcons[state.icon], { className: `${state.color} w-5 h-5` })
          || <LucideIcons.Cloud className={`${state.color} w-5 h-5`} />
          }
        </div>
        <span className='text-white/70 text-sm font-medium'>{formatStatsLabel(state.label) || 'N/A'}</span>
        </div>

        <div className='text-white font-semibold text-lg pl-11'>
        {state.value || 'N/A'}
        </div>
      </div>
      )})}
      </div>

      {/* Sum Time */}
      <div className='grid grid-cols-2 gap-4 mt-8 cursor-pointer'>
      <div className='bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl 
      p-4 border border-orange-400/20 flex items-center hover:from-orange-500/30 hover:to-yellow-500/30'>
      <div className='flex items-center space-x-3 mb-2'>
      <div className='p-2 bg-orange-400/20 rounded-full w-10 h-10 mb-2 flex items-center justify-center'>
        <Sunrise className='text-orange-300 w-5 h-5 mb-2' />
      </div>
      <span className='text-white/80 text-sm font-medium'>Sunrise</span>
      </div>
      <div className='text-white font-semibold text-lg pl-11'>
        {/* Dynamic Content */}
        {formatTime(getWeatherSunrise(weather), weather?.timezone, weather?.sys?.sunset) || 'N/A'}
      </div>
      </div>
      <div className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/20 flex items-center hover:from-purple-500/30 hover:to-pink-500/30
      rounded-2xl p-4 border border-purple-400/20 cursor-pointer'>
        <div className='flex items-center space-x-3 mb-2'>
          <div className='p-2 bg-purple-400/20 rounded-full flex items-center justify-center'>
            <Sunset className='text-purple-300 w-5 h-5 mb-2' />
          </div>
          <span className='text-white/80 text-sm font-medium'>Sunset</span>
        </div>
      <div className='text-white font-semibold text-lg pl-11'>
        {/* Dynamic Content */}
        {formatTime(getWeatherSunset(weather), weather?.timezone, weather?.sys?.sunset) || 'N/A'}
      </div>
      </div>

      </div>

    </div>
  )
};

export default WeatherCard