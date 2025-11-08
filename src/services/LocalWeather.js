const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getLocaltionWeather = async () => {
  try {
    // Verificar se geolocation está disponível
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by your browser.');
    }

    // Obter posição atual
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    // Buscar dados em paralelo
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    return {
      weather: weatherData,
      forecast: forecastData,
      unit: "metric"
    };

  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};

// Função auxiliar para promisificar getCurrentPosition
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};