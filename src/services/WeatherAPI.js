import dotenv from 'dotenv';
dotenv.config();

const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0';

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(!data.status === 200) {
        if (data.status === 404) {
            throw new Error(`City ${city} not found, please check the spelling and try again.`);
        } else if(data.status === 401) {
            throw new Error('Invalid API key, please check your API key and try again.');
        } else {
            throw new Error('An error occurred while fetching the weather data.');
        }}
        if(!data.dt){
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        if (error instanceof TypeError && error.message.includes("fetch")) { 
            throw new Error('Network error: Unable to reach the weather service. Please check your internet connection.');
        }
        if (error.message.includes('City')) {
            throw error;
        }
        throw new Error('An unexpected error occurred while fetching the weather data.', error);
    }
};

// Search by Coordinates

export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(!data.status === 200) {
        if (data.status === 404 || data.status === 401) {
            throw new Error('Invalid API key, please check your API key and try again.');
        } else {
            throw new Error('An error occurred while fetching the weather data.');
        }}
        if(!data.dt){
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        if (error instanceof TypeError && error.message.includes("fetch")) { 
            throw new Error('Network error: Unable to reach the weather service. Please check your internet connection.');
        }
        throw new Error('An unexpected error occurred while fetching the weather data.', error);
    }
};

// Fecth WeatherForecast 

export const fetchWeatherForecastByCity = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(!data.status === 200) {
        if (data.status === 404) {
            throw new Error(`City ${city} not found, please check the spelling and try again.`);
        } else if(data.status === 401) {
            throw new Error('Invalid API key, please check your API key and try again.');
        } else {
            throw new Error('An error occurred while fetching the weather data.');
        }}
        if(!data.dt){
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        if (error instanceof TypeError && error.message.includes("fetch")) { 
            throw new Error('Network error: Unable to reach the weather service. Please check your internet connection.');
        }
        if (error.message.includes('City')) {
            throw error;
        }
        throw new Error('An unexpected error occurred while fetching the weather data.', error);
    }
};

// Search Cities for Autocomplete
export const fetchCitySuggestions = async (query) => {
    try {
        const response = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
        const data = await response.json();
        return data.map((city) => ({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            country: city.country,
            state: city.state || "",
            display_name: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`
        }));
    } catch (error) {
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error('Network error: Unable to reach the weather service. Please check your internet connection.');
        }
        console.error('Error fetching city suggestions:', error);
        throw new Error('An unexpected error occurred while fetching city suggestions.', error);
    }
};

// Fetch WeatherForecast by Coordinates
export const fetchWeatherForecastByCoords = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(!data.status === 200) {
        if (data.status === 404 || data.status === 401) {
            throw new Error('Invalid API key, please check your API key and try again.');
        } else {
            throw new Error('An error occurred while fetching the weather data.');
        }}
        if(!data.dt){
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error('Network error: Unable to reach the weather service. Please check your internet connection.');
        }
        throw new Error('An unexpected error occurred while fetching the weather data.', error);
    }
};