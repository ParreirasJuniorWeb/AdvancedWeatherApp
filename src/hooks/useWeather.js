import { useEffect, useState } from "react";
import { 
    fetchWeatherByCoords,
    fetchWeatherByCity,  
    fetchWeatherForecastByCoords,
    fetchWeatherForecastByCity,
    } from "../services/WeatherAPI";

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

    const fetchWeatherByCityName =  async (city) => {
        setLoading(true);
        setError(null);

        try {

            const[weatherData, forecastData] = await Promise.all([
                fetchWeatherByCity(city, unit),
                fetchWeatherForecastByCity(city, unit)
            ]);

            setCurrentWeather(weatherData);
            setForecast(forecastData);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };    
  
    const fetchWeatherByLocation = async () => {
    if(!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(async (position) => {
        try {
            const { latitude, longitude } = position.coords;

            const [weatherData, forecastData] = await Promise.all([
                fetchWeatherByCoords(latitude, longitude, unit),
                fetchWeatherForecastByCoords(latitude, longitude, unit)
            ]);
            setCurrentWeather(weatherData);
            setForecast(forecastData);
            console.log('Weather data fetched by location:', { weatherData, forecastData });
            return { weatherData, forecastData }
        }
        catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
        } finally {
        setLoading(false);
        }
    }, () => {
        setError('Unable to retrieve your location');
        setLoading(false);
    });
};

const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
};

useEffect(() => {
    fetchWeatherByCityName('New York');
}, []);

return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCityName,
    fetchWeatherByLocation,
    toggleUnit,
};
};