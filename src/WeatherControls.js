

// Get references to input fields and form
const form = document.getElementById("location-form");
const weatherContainer = document.getElementById("weather-data");
const loadingSpinner = document.getElementById("loading-spinner");
const showLoading = () => loadingSpinner.style.display = "block";
const hideLoading = () => loadingSpinner.style.display = "none";

//Displaying the errors
const showError = (message) => {
    weatherContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">${message}</div>
    `;
};
const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            (error) => {
                showError("Unable to retrieve your location. Please try again.");
            }
        );
    } else {
        showError("Geolocation is not supported by your browser.");
    }
};



// Display weather data on the page
const displayWeatherData = (data) => {
    const {
        dt, sunrise, sunset, temp, feels_like, pressure,
        humidity, dew_point, uvi, clouds, visibility,
        wind_speed, wind_deg, weather,
    } = data.current;

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString();

    const currentTime = formatTime(dt);
    const sunriseTime = formatTime(sunrise);
    const sunsetTime = formatTime(sunset);

    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    weatherContainer.innerHTML = `
        <div class="card shadow-sm p-3 mb-4">
            <div class="card-body text-center">
                <img src="${weatherIcon}" alt="${weather[0].description}" class="mb-3">
                <h2 class="card-title text-primary">Current Weather</h2>
                <p><strong>${weather[0].description}</strong></p>
                <p><strong>Temperature:</strong> ${Math.round(temp)} °F</p>
                <p><strong>Feels Like:</strong> ${Math.round(feels_like)} °F</p>
                <p><strong>Pressure:</strong> ${pressure} hPa</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind:</strong> ${wind_speed} m/s at ${wind_deg}°</p>
                <p><strong>Sunrise:</strong> ${sunriseTime}</p>
                <p><strong>Sunset:</strong> ${sunsetTime}</p>
            </div>
        </div>
    `;
};




// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    fetchLocation(city,state);
});
