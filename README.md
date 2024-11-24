# Weather App Project

## Overview
The Weather App is a web-based application that allows users to check real-time weather information for any city worldwide. Users can input a city name, and the app fetches weather details using the OpenWeatherMap API. The app is styled using Bootstrap for a modern and responsive design.

## Features
- Fetches current weather details such as temperature, humidity, UV index, cloud cover, visibility, and wind speed.
- Displays sunrise and sunset times.
- Responsive and clean UI using Bootstrap.
- Error handling for invalid city names or API issues.

## Technologies Used
- **HTML**: For structuring the app.
- **CSS**: Custom styling alongside Bootstrap.
- **JavaScript**: For functionality and API integration.
- **Bootstrap**: For responsive design and layout.
- **OpenWeatherMap API**: For fetching weather and geolocation data.

## Setup Instructions
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
## How It Works
1. The user enters the city name in the input field and submits the form.
2. The app fetches the latitude and longitude of the city using the OpenWeatherMap Geocoding API.
3. The app uses the coordinates to fetch current weather data using the OpenWeatherMap One Call API.
4. Weather data is displayed on the page, including:
      - Temperature (current, feels like)
      - Pressure, humidity, and dew point
      - Wind speed and direction
      - Sunrise and sunset times

