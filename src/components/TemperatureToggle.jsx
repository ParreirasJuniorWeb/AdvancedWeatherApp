import React from 'react'

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
      <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 shadow-lg flex items-center'>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer'>
              <button className={`text-white text-lg font-semibold transition-all duration-300 hover:scale-110 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer
            hover:text-white/80 ${unit === 'metric' ? 'bg-white/70 text-blue-600 shadow-lg transform scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'}`} onClick={onToggle}>°C</button>
          </div>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors mt-2 cursor-pointer'>
              <button className={`text-white text-lg font-semibold transition-all duration-300 hover:scale-110 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer
              hover:text-white/80 ${unit === 'imperial' ? 'bg-white/70 text-blue-600 shadow-lg transform scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'}`} onClick={onToggle}>°F</button>
          </div>
      </div>
  );
}

export default TemperatureToggle