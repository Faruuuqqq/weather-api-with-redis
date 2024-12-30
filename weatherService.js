const redisClient = require('./redisClient');
const axios = require('axios');

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const getWeather = async (city) => {
    const cacheKey = `weather:${city}`;
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Cache hit for city:', city);
            return JSON.parse(cachedData);
        }
    } catch (err) {
        console.error('Error fetching data from Redis:', err);
    }

    try {
        const response = await axios.get(`${BASE_URL}/${city}`, {
            params: { key: process.env.API_KEY },
        });
        const weatherData = response.data;

        try {
            await redisClient.set(cacheKey, JSON.stringify(weatherData), { EX: 43200 });
        } catch (err) {
            console.error('Error saving data to Redis:', err);
        }

        return weatherData;
    } catch (err) {
        console.error('Error fetching data from API:', err);
        throw new Error('Failed to fetch weather data');
    }
};

module.exports = { getWeather };
