import { MapPin, Search, X } from 'lucide-react'
import { useEffect } from 'react'
import React from 'react'
import { fetchCitySuggestions } from '../services/WeatherAPI.js'
import { getLocaltionWeather } from '../services/LocalWeather.js';
import WeatherCard from './WeatherCard.jsx';
import WeatherForecast from './WeatherForecast.jsx';

const SearchBar = ({ onSearch, disabled, loading }) => {

  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [locationWeather, setLocationWeather] = React.useState([]);
  
  const searchRef = React.useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
    setShowSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
  }, []);

  useEffect(() => {
  const searchTimeOut = setTimeout(async () => {
    // Corrigida a lógica da condição
    if (query.trim().length > 2 && query.trim() !== '') {
    setIsSearching(true);
    try {
      const result = await fetchCitySuggestions(query);
      setSuggestions(result || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
    } else {
    setSuggestions([]);
    setShowSuggestions(false);
    }
  }, 300);
  
  return () => clearTimeout(searchTimeOut);
  }, [query]);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (query.trim() === '') return;
  onSearch(query.trim());
  setQuery('');
  setShowSuggestions(false);
  };

  const clearSearch = () => {
  setQuery('');
  setSuggestions([]);
  setShowSuggestions(false);
  };

  const handleSuggestionClick = (city) => {
  // Corrigida a lógica de formatação do nome da cidade
  const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
  onSearch(cityName);
  setQuery('');
  setShowSuggestions(false);
  };

  const handleButtonLocationClick = async () => {
    try {
      const data = await getLocaltionWeather();
      if (data && data.weather && data.forecast) {
        const locationData = {
          weather: data.weather,
          forecast: data.forecast,
          unit: data.unit
        };
        setLocationWeather(locationData);
        onSearch(data.weather.name);
        // console.log('Local weather data fetched successfully:', locationData); // DEPURAÇÃO DO CÓDIGO
        // console.log('Weather:', data.weather);
        // console.log('Forecast:', data.forecast);
        // console.log('Unit:', data.unit);
        // console.log('Name City:', data.weather.name);
        // console.log('Country:', data.weather.sys.country);
        // console.log('Coordinates:', data.weather.coord);
      }
    } catch (error) {
      console.error('Error fetching local weather:', error);
      setLocationWeather(null);
    }
  };

  return (
  <div className='relative w-full max-w-2xl' ref={searchRef}>
    <form className='relative' onSubmit={handleSubmit}>
    <div className='relative group'>
      <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 
      group-focus-within:text-white transition-colors cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out' 
      color='#ededed'/>
      
      <input 
      type='text' 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder='Search cities...'
      className='w-full pl-12 pr-24 py-4 bg-white/10 border 
      border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 
      focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out 
      focus:bg-white/15 focus:border-white/30 focus:shadow-lg focus:shadow-blue-500/20' 
      aria-label='Search cities'
      autoComplete='off'
      spellCheck='false'
      autoCorrect='off'
      disabled={disabled}
      />
      
      {query && (
      <button 
        className='absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 hover:text-white transition-colors focus:outline-none focus:text-white' 
        aria-label='Clear search input' 
        type='button' 
        onClick={clearSearch}
      >
        <X className='w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out' color='#ededed'/>
      </button>
      )}

      <button 
      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 hover:text-white transition-colors focus:outline-none focus:text-white disabled:opacity-50 disabled:cursor-not-allowed' 
      aria-label='Get current location' 
      type='button' 
      onClick={handleButtonLocationClick}
      disabled={disabled || loading}
      {...locationWeather
      && (<WeatherCard weather={locationWeather.weather} unit={locationWeather.unit} />) 
      && (<WeatherForecast forecast={locationWeather.forecast} unit={locationWeather.unit} />)}
      >

      <MapPin className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out' color='#ededed'/>
      </button>
    </div>
    </form>

    {showSuggestions && (suggestions.length > 0 || isSearching) && (
    <div className='absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg 
    max-h-60 overflow-y-auto z-50'>
      {isSearching ? (
      <div className='p-6 text-center text-white/70'>
        <div className='animate-spin rounded-full h-8 w-8 
        border-t-2 border-b-2 border-white/70 mx-auto mb-4'></div>
        <p>Searching for cities...</p>
      </div>
      ) : (
      suggestions.map((city, index) => (
        <button 
        className='w-full px-6 py-4 text-left hover:bg-white/20 transition-colors
        duration-200 ease-in-out items-center justify-between group border-b border-white/10 last:border-b-0 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 rounded-xl
        flex gap-4' 
        type='button' 
        key={`${city.name}-${city.country}-${index}`} 
        onClick={() => handleSuggestionClick(city)}
        >
        <div>
          <div className='font-medium text-white group-hover:text-white/90'>
          {city.name}{city.state && `, ${city.state}`}{city.country && `, ${city.country}`}
          </div>
          <div className="text-sm text-white/60 group-hover:text-white/80">
          {city.country}
          </div>
        </div>
        
        {city.distance && (
          <div className='flex items-center gap-2 text-white/70 group-hover:text-white/90'>
          <MapPin className='w-4 h-4'/>
          <span className='text-white/60 group-hover:text-white/80'>
            {city.distance.toFixed(2).toString().replace('.', ',')} km
          </span>
          </div>
        )}
        
        <Search className='w-5 h-5 text-white/70 group-hover:text-white/90' />
        </button>
      ))
      )}
    </div>
    )}
  </div>
  )
}

export default SearchBar