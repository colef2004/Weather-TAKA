const geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct";
const weatherAPI = "https://api.openweathermap.org/data/3.0/onecall?";
const APIKey = "f1bde32eb648f1a1b7eb39a666111ae0";

// Get references to input fields and form
const form = document.getElementById("location-form");
const weatherContainer = document.getElementById("weather-data");

// Fetch location based on city and state
const fetchLocation = async (city) => {
    const url = `${geocodingAPI}?q=${city}&appid=${APIKey}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.length) {
            throw new Error("Location not found!");
        }

        // Get latitude and longitude
        const { lat, lon } = data[0];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        fetchWeather(lat, lon);
    } catch (error) {
        console.error("Error fetching location data:", error);
        weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
};

// Fetch weather data based on latitude and longitude
const fetchWeather = async (latitude, longitude) => {
    const url = `${weatherAPI}lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
};

// Display weather data on the page
const displayWeatherData = (data) => {
    const {
        dt, sunrise, sunset, temp, feels_like, pressure,
        humidity, dew_point, uvi, clouds, visibility,
        wind_speed, wind_deg,city,state,
    } = data.current;

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString();


    const currentTime = formatTime(dt);
    const sunriseTime = formatTime(sunrise);
    const sunsetTime = formatTime(sunset);


    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Time:</strong> ${currentTime}</p>
        <p><strong>Temperature:</strong> ${Math.round(temp)} °F</p>
        <p><strong>Feels Like:</strong> ${Math.round(feels_like)} °F</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Dew Point:</strong> ${dew_point} °F</p>
        <p><strong>UV Index:</strong> ${uvi}</p>
        <p><strong>Cloud Cover:</strong> ${clouds}%</p>
        <p><strong>Visibility:</strong> ${visibility} meters</p>
        <p><strong>Wind:</strong> ${wind_speed} m/s at ${wind_deg}°</p>
        <p><strong>Sunrise:</strong> ${sunriseTime}</p>
        <p><strong>Sunset:</strong> ${sunsetTime}</p>
    `;
};

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh
    const city = document.getElementById("city").value;
    //const state = document.getElementById("state").value;
    fetchLocation(city);
});
