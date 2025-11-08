import { Calendar, Droplet } from 'lucide-react'
import React from 'react'
import * as LucideIcons from 'lucide-react';
import { getWeatherIconByCode, getWeatherDescription, formatTemperature, formatHumidity } from '../utils/WeatherUtils.js';

const WeatherForecast = ({ forecast, unit="metric" }) => {

  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const dailyItems = Object.values(dailyForecast).slice(0, 5);
  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8
    shadow-2xl'>
    <div className='flex items-center space-x-3 mb-8'>
    <div className='p-2 bg-white/10 rounded-full'>
      <Calendar className='text-white/80 w-6 h-6'/>
    </div>
    <h2 className='text-2xl font-bold text-white'>5 Day Forecast</h2>
    </div>

    <div className='space-y-4'>
      {/* Forecast Item */}
      {dailyItems.map((item, index)=> {
        const iconName = getWeatherIconByCode(item.weather[0].icon);
        const WeathrIcon = LucideIcons[iconName] || LucideIcons['Cloud'];

        const date = new Date(item.dt * 1000);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString("pt-BR", options);

      return (
          <div key={index} className='flex items-center justify-between p-5 bg-white/5 rounded-2xl
      backdrop-blur-sm hover:bg-white/10  transition-all duration-300 group border cursor-pointer
       border-white/10'>
       <div className='flex items-center space-x-5 flex-1'>
       <div className='text-white/90 group-hover:text-white transition-all transform
       group-hover:scale-110 duration-300 font-medium w-20'>{formattedDate}
       {/* Dynamic Icons */}
       {
        iconName && WeathrIcon && (
        <div className=''>
        <div className='flex items-center justify-center w-16 h-16 bg-white/10 rounded-full'>
        <WeathrIcon className='w-10 h-10'/>
        </div>
        </div>)
       }
       </div>

       <div className='flex-1'>
        <div className='text-white font-semibold text-lg'>
        {index === 0 ? 'Tomorrow' : formattedDate}
        {/* Dynamic/Conditional Date */}
        </div>

        <div className='text-white/70 text-sm capitalize font-medium'>
          {getWeatherDescription(item.weather[0].description) || 'Weather Description'}
        </div>
       </div>
       </div>

       <div className='flex items-center space-x-6'>
        <div className='flex items-center space-x-2 text-white/60'>
          <Droplet className='w-5 h-5 text-blue-300'/>
          <span className='text-sm font-medium'>
          {/* Dynamic Details */}
          {formatHumidity(item.main.humidity)}
          </span>
        </div>

        <div className='text-right'>
          <div className='text-white font-bold text-xl'>
            {formatTemperature(item.main.temp, unit )}
          </div>
          <div className='text-white text-sm font-medium'>
          Low: {formatTemperature(item.main.temp_min, unit)}
          </div>
          <div className='text-white text-sm font-medium'>
          High: {formatTemperature(item.main.temp_max, unit)}
          </div>
        </div>
       </div>
      </div>
        );
      } )}
      {/* End of Forecast Item */}
    </div>
    </div>
  )
}

export default WeatherForecast
