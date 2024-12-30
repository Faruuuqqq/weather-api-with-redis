require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const { getWeather } = require('./weatherService');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter untuk mencegah penyalahgunaan
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // Maksimal 100 permintaan per IP
});

app.use(limiter);

app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const weather = await getWeather(city);
        res.json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
