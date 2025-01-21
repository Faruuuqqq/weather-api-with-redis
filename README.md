# Weather API with Redis

This repository contains a Node.js-based Weather API that integrates with a third-party weather service to fetch current weather data for specified locations. To enhance performance and reduce the number of requests to the external API, Redis is utilized for caching the weather data.

## Features

- **Fetch Current Weather**: Retrieve current weather information for a specified location.
- **Redis Caching**: Cache weather data in Redis to minimize redundant API calls and improve response times.
- **Environment Variables**: Manage sensitive information such as API keys and Redis credentials using environment variables.
- **Error Handling**: Gracefully handle errors for invalid city names or third-party API issues.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Redis](https://redis.io/) (for caching)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Faruuuqqq/weather-api-with-redis.git
   cd weather-api-with-redis
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```env
     WEATHER_API_KEY=your_weather_api_key
     REDIS_HOST=localhost
     REDIS_PORT=6379
     REDIS_PASSWORD=your_redis_password
     CACHE_EXPIRATION=3600  # Cache expiration time in seconds (e.g., 1 hour)
     ```

4. **Start the Redis server**:

   Ensure that your Redis server is running and accessible using the credentials provided in the `.env` file.

5. **Start the server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Endpoints

- **GET `/weather?city={city_name}`**: Fetches current weather data for the specified city.
  - **Query Parameters**:
    - `city` (required): Name of the city (e.g., `London`).
  - **Response**:
    - **Success (200)**:

      ```json
      {
        "status": "success",
        "data": {
          "city": "London",
          "temperature": 15,
          "description": "Partly cloudy",
          "humidity": 80,
          "wind_speed": 5
        },
        "source": "api"  // Indicates data source: 'api' or 'cache'
      }
      ```

    - **Failure (400)**:

      ```json
      {
        "status": "fail",
        "message": "Invalid city name"
      }
      ```

    - **Failure (500)**:

      ```json
      {
        "status": "error",
        "message": "Unable to fetch weather data"
      }
      ```

## Project Structure

- `server.js`: Initializes and configures the Express server.
- `routes/weather.js`: Defines the route for fetching weather data.
- `services/weatherService.js`: Contains logic for interacting with the third-party weather API and Redis cache.
- `config/redisClient.js`: Configures and exports the Redis client instance.

## Dependencies

- **`express`**: Web framework for Node.js.
- **`axios`**: Promise-based HTTP client for making API requests.
- **`redis`**: Redis client for Node.js.
- **`dotenv`**: Loads environment variables from a `.env` file.
- **`nodemon`**: Utility for automatically restarting the server during development.

## Development

For development purposes, you can use `nodemon` to automatically restart the server when changes are detected:

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [Redis Documentation](https://redis.io/documentation)
- [OpenWeatherMap API](https://openweathermap.org/api)

Feel free to customize this README further to suit your project's specific details. 
