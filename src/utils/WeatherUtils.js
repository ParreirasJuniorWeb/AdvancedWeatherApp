export const DateTimeFormatter = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString("pt-BR", options);
};

export const getWeatherIcon = (weather) => {
    const iconMap = {
        Clear: 'Sun',
        Clouds: 'Cloud',
        Rain: 'CloudRainy',
        Drizzle: 'CloudDrizzle',
        Thunderstorm: 'CloudLightning',
        Snow: 'CloudSnow',
        Mist: 'CloudFog',
        Fog: 'CloudFog',
        Haze: 'CloudFog',
        Dust: 'Wind',
        Sand: 'Wind',
        Ash: 'Wind',
        Squall: 'Wind',
        Tornado: 'Tornado'
    };

    return iconMap[weather] || 'Cloud';
};

export const getWeatherIconByCode = (iconCode) => {
    const iconCodeMap = {
        '01d': 'Sun',
        '01n': 'Moon',
        '02d': 'CloudSun',
        '02n': 'CloudMoon',
        '03d': 'Cloud',
        '03n': 'Cloud',
        '04d': 'Cloud',
        '04n': 'Cloud',
        '09d': 'CloudDrizzle',
        '09n': 'CloudDrizzle',
        '10d': 'CloudRainy',
        '10n': 'CloudRainy',
        '11d': 'CloudLightning',
        '11n': 'CloudLightning',
        '13d': 'CloudSnow',
        '13n': 'CloudSnow',
        '50d': 'CloudFog',
        '50n': 'CloudFog'
    };
    return iconCodeMap[iconCode] || 'Cloud';
};

export const formatTemperature = (temp, unit) => {
    if (unit === 'metric') {
        return `${Math.round(temp)}° C`;
    } else {
        return `${Math.round((temp * 9) / 5 + 32)}° F`;
    }
};

export const formatDateTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString("pt-BR", options);
};
export const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const options = { hour: '2-digit', minute: '2-digit' };
    const AMorPM = date.getHours() >= 12 ? 'PM' : 'AM';
    return date.toLocaleTimeString("pt-BR", options, { hour12: true }) + ' ' + AMorPM;
};


/* Extraindo os dados do clima API para variáveis */

export const getWeatherName = (weather) => {
    return weather?.name || 'Unknown Location';
};
export const getWeatherCountry = (weather) => {
    return weather?.sys?.country || 'Unknown Country';
};
export const getWeatherTemp = (weather) => {
    return weather?.main?.temp || 0;
};
export const getWeatherFeelsLike = (weather) => {
    return weather?.main?.feels_like || 0;
};
export const getWeatherHumidity = (weather) => {
    return weather?.main?.humidity || 0;
};
export const getWeatherWindSpeed = (weather) => {
    return weather?.wind?.speed || 0;
};
export const getWeatherPressure = (weather) => {
    return weather?.main?.pressure || 0;
};
export const getWeatherVisibility = (weather) => {
    return weather?.visibility || 0;
};
export const getWeatherSunrise = (weather) => {
    return weather?.sys?.sunrise || 0;
};
export const getWeatherSunset = (weather) => {
    return weather?.sys?.sunset || 0;
};export const getWeatherMain = (weather) => {
    return weather?.weather?.[0]?.main || 'Unknown';
};

/* Helper functions for WeatherCard stats */
export const getWeatherDescription = (weather) => {
    const descriptionMap = {
        Clear: 'Céu limpo',
        Clouds: 'Nublado',
        Rain: 'Chovendo',
        Drizzle: 'Garoa',
        Thunderstorm: 'Tempestade',
        Snow: 'Neve',
        Mist: 'Névoa',
        Fog: 'Neblina',
        Haze: 'Neblina',
        Dust: 'Poeira',
        Sand: 'Areia',
        Ash: 'Cinzas',
        Squall: 'Rajada',
        Tornado: 'Tornado'
    };

    return descriptionMap[weather] || weather;
};

export const capitalizeDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
};
export const formatStatsLabel = (label) => {
    const labelMap = {
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        pressure: 'Pressure',
        visibility: 'Visibility',
        sunrise: 'Sunrise',
        sunset: 'Sunset'
    };

    return labelMap[label] || label;
};
export const formatWindSpeed = (speed, unit) => {
    if (unit === 'metric') {
        return `${(speed * 3.6).toFixed(1)} km/h`;
    } else {
        return `${(speed * 2.237).toFixed(1)} mph`;
    }
};

export const formatVisibility = (visibility) => {
    return `${(visibility / 1000).toFixed(1)} km`;
};

export const formatPressure = (pressure) => {
    return `${pressure} hPa`;
};
export const formatHumidity = (humidity) => {
    return `${humidity}%`;
};

export const formatSunTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
};
export const getStatIcon = (label) => {
    const iconMap = {
        humidity: 'Droplet',
        windSpeed: 'Wind',
        pressure: 'Gauge',
        visibility: 'Eye',
        sunrise: 'Sunrise',
        sunset: 'Sunset'
    };
    return iconMap[label] || 'Info';
};

export const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
};