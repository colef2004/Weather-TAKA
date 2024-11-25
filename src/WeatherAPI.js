const geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct";
const weatherAPI = "https://api.openweathermap.org/data/3.0/onecall?";
const APIKey = "f1bde32eb648f1a1b7eb39a666111ae0";

// Fetch location based on city and state
const fetchLocation = async (city,state) => {
    const url = `${geocodingAPI}?q=${city},${state}&appid=${APIKey}`;
    showLoading();
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
        hideLoading();
    } catch (error) {
        console.error("Error fetching location data:", error);
        showError(error);
    }
};


// Fetch weather data based on latitude and longitude
const fetchWeather = async (latitude, longitude) => {
    const url = `${weatherAPI}lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`;
    showLoading();
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayWeatherData(data);
        hideLoading();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
};